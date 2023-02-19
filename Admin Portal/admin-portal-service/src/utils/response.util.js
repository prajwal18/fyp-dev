const success = (res, data, message) => {
  return res.json({ success: true, data: data, message, message });
};

const error = (res, data, message) => {
  return res.json({ success: false, data: data, message, message });
};

module.exports = { success, error };
