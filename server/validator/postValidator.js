const postValidator = data => {
  const error = {};

  if (!data.title) {
    error.title = 'You Have to Provide Title';
  } else if (data.title.length < 10 || data.title.length > 30) {
    error.title =
      'The title must be greater than 10 characters and less than 30 characters';
  }

  if (!data.description) {
    error.description = 'You Have to Provide description';
  }

  if (!data.category) {
    error.category = 'You have to provide category';
  }

  if (!data.tags) {
    error.tags = 'You have to add at least three tags';
  } else if (data.tags.length < 3) {
    error.tags = 'You have to add at least three tags';
  }

  if (!data.featuredItems) {
    error.featuredItems =
      'You have to add at least one featured Image/video/audio';
  } else if (data.featuredItems.length === 0) {
    error.featuredImage =
      'You have to add at least one featured Image/video/audio';
  }

  return {
    error,
    isValid: Object.keys(error).length === 0
  };
};

module.exports = postValidator;
