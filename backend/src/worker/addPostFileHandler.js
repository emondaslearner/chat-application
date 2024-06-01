const {
  uploadPhotoToCloudinary,
  uploadVideoToCloudinary,
} = require("../third-party/cloudinary");
const Video = require("../models/Video");
const Photo = require("../models/Photo");
const Post = require("../models/Post");
const { parentPort } = require("worker_threads");

const uploadPostVideo = async (video, userId, percentage) => {
  const videoSchemaIds = [];
  const video_list = [];

  for (let i = 0; i < video.length; i++) {
    const url = await uploadVideoToCloudinary({
      videoPath: `./src/uploads/${video[i].filename}`,
      folderName: "post-videos",
    });

    video_list.push({
      video: url,
      user: userId,
    });

    // update the upload status via socket connection
    // socket.to(userId).emit("postUploaded", percentage * (i + 1));
    parentPort.postMessage({
      userId,
      percentage: percentage * (i + 1),
      status: "addPost",
    });
    console.log(percentage * (i + 1));
  }

  const video_data = await Video.insertMany(video_list);

  video_data.map((data) => videoSchemaIds.push(data._id));

  return videoSchemaIds;
};

const uploadPostPhoto = async (photo, userId, percentage) => {
  const photoSchemaIds = [];
  const url_list = [];

  for (let i = 0; i < photo.length; i++) {
    const fileUploadedData = await uploadPhotoToCloudinary({
      imagePath: `./src/uploads/${photo[i].filename}`,
      folderName: "post-photos",
      unique_filename: true,
      use_filename: false,
      overwrite: false,
    });

    url_list.push({
      user: userId,
      photo: fileUploadedData.secure_url,
    });

    // update the upload status via socket connection
    // socket.to(userId).emit("postUploaded", percentage * (i + 1));
    parentPort.postMessage({
      userId,
      percentage: percentage * (i + 1),
      status: "addPost",
    });
    console.log(percentage * (i + 1));
  }

  const photo_data = await Photo.insertMany(url_list);

  photo_data.map((data) => photoSchemaIds.push(data._id));

  return photoSchemaIds;
};

const calculatePercentagePerFile = async (photoLength, videoLength) => {
  // calculate percentage
  const totalFiles = photoLength + videoLength;

  const totalPercentage = 90;

  // Calculate the percentage allocation based on the number of photos and videos
  const photoAllocation = (photoLength / totalFiles) * totalPercentage;
  const videoAllocation = (videoLength / totalFiles) * totalPercentage;

  // Calculate the per-item percentage
  const perPhotoPercentage =
    photoLength > 0 ? Math.ceil(photoAllocation / photoLength) : 0;
  const perVideoPercentage =
    videoLength > 0 ? Math.ceil(videoAllocation / videoLength) : 0;

  return {
    photoPercentage: perPhotoPercentage,
    videoPercentage: perVideoPercentage,
  };
};

const addPost = async ({ title, color, photo, video, userId }) => {
  let perVideoPercentage;
  let perPhotoPercentage;
  if (photo.length || video.length) {
    const { photoPercentage, videoPercentage } =
      await calculatePercentagePerFile(photo.length, video.length);
    perVideoPercentage = videoPercentage;
    perPhotoPercentage = photoPercentage;
  }

  // upload photo
  let photoSchemaIds = [];
  if (photo.length) {
    photoSchemaIds = await uploadPostPhoto(photo, userId, perPhotoPercentage);
  }

  // upload video
  let videoSchemaIds = [];
  if (video.length) {
    videoSchemaIds = await uploadPostVideo(video, userId, perVideoPercentage);
  }

  const data = new Post({
    title,
    color,
    photos: photoSchemaIds,
    videos: videoSchemaIds,
    user: userId,
  });

  await data.save();

  // socket.to(userId).emit("postUploaded", 100);
  parentPort.postMessage({ userId, percentage: 100, status: "addPost" });

  return true;
};

module.exports = {
  addPost,
};
