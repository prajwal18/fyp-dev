const notFound = (req, res) => {
    res.status(404).json({msg: 'Sorry, the route cannot be found'});
}

module.exports = notFound;