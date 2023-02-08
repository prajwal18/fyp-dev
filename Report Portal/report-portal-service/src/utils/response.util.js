const success = (res, data, message, status = 400) => {
  return res.status(status).json({ success: true, data: data, message, message });
};

const error = (res, data, message, status = 400) => {
  return res.status(status).json({ success: false, data: data, message, message });
};

module.exports = { success, error };
