const Note = require('../../models/Note');

module.exports = {
  getAllNotes: (req, res) => {
    Note.find({}, (err, notes) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(notes);
    });
  },

  getNoteById: (req, res) => {
    Note.findById(req.params.id, (err, note) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json(note);
    });
  },

  createNote: async (req, res) => {
    const { title, userId } = req.body;
    if (!title || !userId) {
      return res
        .status(400)
        .json({ msg: 'Notes must have a title and userId' });
    }

    return Note.create(req.body, (err, note) => {
      if (err) return res.status(500).json(err);
      return res.json({ msg: 'Note created', note });
    });
  },

  updateNote: async (req, res) => {
    const query = { _id: req.body._id };
    const options = { new: true };

    return Note.findOneAndUpdate(query, req.body, options, (err, note) => {
      if (err) return res.status(500).json(err);
      return res.json({ msg: 'Note updated', note });
    });
  },

  deleteNote: (req, res) => {
    return Note.deleteOne({ _id: req.params.id }, (err) => {
      if (err) return res.status(500).json(err);
      return res.status(200).json({ msg: 'Note deleted' });
    });
  },
};
