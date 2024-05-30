const deleteUploadedFile = async (filePath) => {
  try {
    await fs.unlink(filePath);
    console.log(`Deleted uploaded file: ${filePath}`);
  } catch (error) {
    console.error(`Error deleting uploaded file: ${error.message}`);
  }
};

// pagination
const paginationDetails = ({ page, limit, totalResources }) => {
  const totalPage = Math.ceil(totalResources / limit);

  const nxtPage = totalResources > page && page + 1;
  const prvPage = page > 1 && page - 1;

  const response = {
    page,
    limit,
    totalPage,
    totalResources,
  };

  if (nxtPage) response.nxtPage = nxtPage;
  if (prvPage) response.prvPage = prvPage;

  return response;
};

module.exports = {
  deleteUploadedFile,
  paginationDetails,
};
