import Turf from '../models/Turf.js';
export const createTurf = async (req, res) => {
  const { name, location, category, price, image } = req.body;

  if (req.user.role !== 'manager') {
    return res.status(403).json({ message: 'Only managers can create turfs' });
  }

  const turf = new Turf({
    name,
    location,
    category,
    price,
    image,
    manager: req.user._id, 
  });

  const createdTurf = await turf.save();
  res.status(201).json(createdTurf);
};




export const getAllTurfs = async (req, res) => {
  const { location, sportType } = req.query;
  const filter = { approved: true }; 

  if (location) filter.location = { $regex: location, $options: 'i' };
  if (sportType) filter.category = sportType;

  const turfs = await Turf.find(filter);
  res.json(turfs);
};



export const getTurfById = async (req, res) => {
  const turf = await Turf.findById(req.params.id);
  if (!turf) return res.status(404).json({ message: 'Turf not found' });
  res.json(turf);
};

// export const updateTurf = async (req, res) => {
//   const turf = await Turf.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.json(turf);
// };

export const deleteTurf = async (req, res) => {
  await Turf.findByIdAndDelete(req.params.id);
  res.json({ message: 'Turf deleted' });
};

export const approveTurf = async (req, res) => {
  try {
    const turf = await Turf.findById(req.params.id);

    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }

    turf.approved = true;
    await turf.save();

    res.status(200).json({ message: 'Turf approved successfully', turf });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


export const updateTurf = async (req, res) => {
  const { name, location, category, price, image } = req.body;
  
  try {
    const turf = await Turf.findById(req.params.id);

    if (!turf) {
      return res.status(404).json({ message: 'Turf not found' });
    }

    if (turf.manager.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'You do not have permission to update this turf' });
    }

    turf.name = name || turf.name;
    turf.location = location || turf.location;
    turf.category = category || turf.category;
    turf.price = price || turf.price;
    turf.image = image || turf.image;

    await turf.save();

    res.status(200).json({ message: 'Turf updated successfully', turf });
  } catch (err) {
    console.error('Error updating turf:', err);
    res.status(500).json({ message: 'Server error while updating turf' });
  }
};
