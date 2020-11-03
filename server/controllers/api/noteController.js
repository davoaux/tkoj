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

  deleteNote: (req, res) => {
    Note.findByIdAndDelete(req.params.id, (err, note) => {
      if (err) return res.status(500).json(err);
      if (!note) return res.status(200).json({ msg: "Note doesn't exist" });
      return res.status(200).json({ msg: 'Note deleted', note });
    });
  },
};
