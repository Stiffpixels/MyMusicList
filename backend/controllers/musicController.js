const music = require("../models/musicModel");
const ErrorHandler = require("../utils/errorHandler");
const uploadAnImage = require("../utils/cloudinary");

const getmusic = async (req, res, next) => {
  const { name, fields, category, numFilters, page, limit } = req.query;
  const qParams = {};
  const musicCount = await music.count();
  const pageCount = Math.ceil(musicCount / 10);
  const newLimit = Number(limit) || 10;
  if (name) {
    qParams.name = { $regex: name, $options: "i" };
  }

  if (category) {
    qParams.category = { $in: category.split(",") };
  }

  if (numFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "==": "$eq",
      "<": "$lt",
      "<=": "$lte",
    };

    const re = /\b(>|>=|==|<+|<)\b/g;

    const mongoNumFilters = numFilters.replace(re, (match) => `-${operatorMap[match]}-`);

    mongoNumFilters.split(",").map((filter) => {
      const [field, operator, value] = filter.split("-");
      if (qParams.hasOwnProperty(field)) {
        const prevQuery = qParams[field];
        qParams[field] = { ...prevQuery, [operator]: (Number9 = value) };
        return;
      }
      qParams[field] = { [operator]: Number(value) };
    });
  }

  let results = music.find(qParams);

  if (Number(page) > 1) {
    const skipItems = (page - 1) * newLimit;
    console.log("Number of items skipped: ", skipItems);
    results = results.skip(skipItems);
  }

  results = results.limit(newLimit);

  if (fields) {
    results = results.select(fields);
  }

  const Music = await results;

  if (Music.length === 0) {
    throw new ErrorHandler("No music found", 404);
  }

  res.status(200).json({ success: true, Music, pageCount });
};

const getmusicDetail = async (req, res) => {
  const { id } = req.query;
  const Music = await music.findById(id);
  if (!Music) {
    throw new ErrorHandler("No music found with that id", 404);
  }

  res.status(200).json({ success: true, Music });
};

const musicStatic = async (req, res) => {
  const musicFetched = await music.find();
  res.status(200).json({ musicFetched });
};

const getTrendingMusic = async (req, res) => {
  const dateLimit = new Date(Date.now() - 15 * 1000 * 60 * 60 * 24).toISOString().split("T")[0];
  console.log(dateLimit);
  const Music = await music.find({ createdAt: { $gte: dateLimit } }).find({
    rating: { $gte: 4 },
    numOfReviews: { $gte: 20 },
  });
  res.status(200).json({ message: "success", Music });
};

const addmusic = async (req, res) => {
  if (!req.file) {
    throw new ErrorHandler("Please provide an album cover");
  }
  let b64 = Buffer.from(req.file.buffer).toString("base64");
  let dataURI = "data:" + req.file.mimetype + ";base64," + b64;
  const public_id = await uploadAnImage(dataURI);
  const musicdata = { ...req.body, image: { public_id } };

  musicdata.admin = req.user._id;
  delete musicdata.cover_art;
  const songs = JSON.parse(musicdata.songs);
  delete musicdata.songs;

  const songsList = [];

  Object.entries(songs).forEach(([key]) => {
    songsList.push(songs[key]);
  });

  const Music = await music.create({ ...musicdata, songs: [...songsList] });

  res.status(200).json({
    success: true,
    Music,
  });
};

//function to generate a mongodb query using switch conditional
const getQuery = (field) => {
  const fieldList = field.split(",");
  const fieldQuery = {};

  switch (fieldList[0]) {
    case "name":
      if (fieldList[1] === "notexists") {
        fieldQuery.name = { $exists: false };
      } else {
        fieldQuery.name = fieldList[1];
      }
      break;
    case "price":
      fieldQuery.price = fieldList[1];
      break;
    case "category":
      fieldQuery.category = fieldList[1];
      break;
    case "rating":
      fieldQuery.rating = Number(fieldList[1]);
      break;
    default:
      throw new ErrorHandler("Please provide a valid field either name, price, category, or rating");
  }

  return fieldQuery;
};

//updates single or multiple music
const updatemusic = async (req, res) => {
  const { id, field } = req.query;
  let status;
  const newValues = req.body;

  if (id) {
    if (req.file) {
      await Music.updateOne(
        { _id: id },
        {
          img: {
            data: fs.readFileSync(req.file.path),
            contentType: "image/jpg",
          },
        }
      );
      fs.unlink(req.file.path, (err) => {
        if (err) console.log(err);
      });
    }
    status = await music.findOneAndUpdate({ _id: req.query.id }, newValues, {
      new: true,
    });
  }
  if (field) {
    const fieldQuery = getQuery(field);
    const matchedmusic = await music.find(fieldQuery);

    if (matchedmusic.length === 0) {
      throw new ErrorHandler("No music found with that field value", 404);
    }

    status = await music.updateMany(fieldQuery, { $set: newValues }, { multi: true });
  }

  res.status(200).json({
    success: true,
    status,
  });
};

//deletes single or multiple matched documents
const deletemusic = async (req, res) => {
  const { id, field } = req.query;
  const music = {};

  if (id) {
    music.onemusic = await music.findOneAndDelete({ _id: id });
  }
  if (field) {
    const fieldQuery = getQuery(field);
    const matchedmusic = await music.find(fieldQuery);

    if (matchedmusic.length === 0) {
      throw new ErrorHandler("No music found with that field value", 404);
    }

    music.music = await music.deleteMany(fieldQuery);
  }

  res.status(200).json({
    success: true,
    music,
  });
};

const createUpdateReview = async (req, res) => {
  const { rating, comment, musicId } = req.body;

  if (!(rating && musicId)) {
    throw new ErrorHandler("Please enter rating and music ID", 500);
  }

  const review = {
    user: req.user.id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const music = await music.findById(musicId);
  const isReviewed = music.reviews.find((rev) => rev.user.toString() === req.user.id);

  if (isReviewed) {
    music.reviews.forEach((rev) => {
      if (music.reviews.find((rev) => rev.user.toString() === req.user.id)) {
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    music.reviews.push(review);
    music.numOfReviews += 1;
  }

  let avgRating = 0;
  music.reviews.forEach((rev) => {
    avgRating += rev.rating;
  });
  avgRating /= music.numOfReviews;
  music.ratings = avgRating;

  await music.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
    music,
  });
};

module.exports = {
  getmusic,
  musicStatic,
  getmusicDetail,
  addmusic,
  updatemusic,
  deletemusic,
  createUpdateReview,
  getTrendingMusic,
};
