const notFound = (req, res) => {
    res.json({msg: 'Sorry, the route cannot be found'});
}

module.exports = notFound;