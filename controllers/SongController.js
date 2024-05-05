import Song from "../models/song.js";
const createSong = async(req, res)=>{
    try{
        const songs = await Song.create(req.body);
        res.status(200).json(songs);
    }catch(error){
        res.status(500).json({message:error.message});
    }
}

const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.status(200).json(songs);
    } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
};

const getSpecificSong = async(req, res)=>{
    try{
        const {id} = req.params;
        const song = await Song.findById(id);
        res.status(200).json(song);

    }catch(error){
        console.error("Error fetching products:", error);
        res.status(500).json({ error: "Internal server error" });
    }
}

const UpdateSpecificSong = async(req, res)=>{
    try{
        const {id} = req.params;
        const song = await Song.findByIdAndUpdate(id, req.body, {new:true});
        if(!song){
          return res.status(404).json({message:"product not found"});
        }
      
        res.status(200).json(song);
        }catch(error){
          res.status(500).json({message:error.message});
        }
        
}

const DeleteSpecificSong = async(req, res)=>{
    try{
        const {id} = req.params;
        const song = await Song.findByIdAndDelete(id);
        if(!song){
          return res.status(404).json({message:"product not found"});
        }
      
      }catch(error){
        res.status(500).json({message:error.message});
      }
      
}

export { getSongs, getSpecificSong, UpdateSpecificSong, DeleteSpecificSong, createSong };
