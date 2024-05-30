const Post = require("@models/Post");
const Video = require("@models/Video");
const Photo = require("@models/Photo");
const { error } = require("@utils");
const {
  uploadPhotoToCloudinary,
  uploadVideoToCloudinary,
} = require("@third-party/cloudinary");


const addPost = async ({ title, color, photo, video, userId }) => {
  if (color && !title) {
    throw error.badRequest(
      "title:When you provide color then you must have to pass title"
    );
  }

  if (color && title && photo.length) {
    throw error.badRequest(
      "photo:When you provide color then you can not pass photo"
    );
  }

  if (color && title && video.length) {
    throw error.badRequest(
      "photo:When you provide color then you can not pass video"
    );
  }

  // upload photo to cloudinary
  const photoSchemaIds = [];
  if (photo.length) {
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
    }

    const photo_data = await Photo.insertMany(url_list);

    photo_data.map((data) => photoSchemaIds.push(data._id));
  }

  // upload video to cloudinary
  const videoSchemaIds = [];
  if (video.length) {
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
    }

    const video_data = await Video.insertMany(video_list);

    video_data.map((data) => videoSchemaIds.push(data._id));
  }

  const data = new Post({
    title,
    color,
    photos: photoSchemaIds,
    videos: videoSchemaIds,
    user: userId,
  });

  await data.save();

  return data;
};

module.exports = addPost;
