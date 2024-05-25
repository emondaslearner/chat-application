const deleteUploadedFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted uploaded file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting uploaded file: ${error.message}`);
  }
};

module.exports = {
  deleteUploadedFile,
};
