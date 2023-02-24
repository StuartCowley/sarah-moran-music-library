const db = require('../db/index');

const createAlbum = async (req, res) => {
  const { name, year } = req.body;
  const { id } = req.params;

  try {
    const {
      rows: [album],
    } = await db.query(
      'INSERT INTO Albums (name, year, artistId) VALUES ($1, $2, $3) RETURNING *',
      [name, year, id]
    );
    res.status(200).json(album);
  } catch (err) {
    res.status(500).json(err.message);
  }
};

const readAlbum = async (_, res) => {
  try {
    const { rows } = await db.query('SELECT * FROM Albums');
    res.status(200).json(rows);
  } catch (err){
    res.status(500).json(err.message);
  }
};

const getAlbumById = async (req, res) => {
  const { id } = req.params;

  try{
    const {
      rows: [album],
    } = await db.query(
      'SELECT * FROM Albums WHERE id = $1', [id]
    );
    if (!album) {
      res.status(404).json({ message: `album ${id} does not exist` });
    }

    res.status(200).json(album);
   

  } catch (err) {
    res.status(500).json(err.message);
  }
};

module.exports = { createAlbum, readAlbum, getAlbumById };
