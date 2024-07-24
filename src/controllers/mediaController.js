
const cloudinary = require('../utils/cloudinary');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const uploadMedia = async (req, res) => {
  const { uuid } = req.user;
  const file = req.body.media;
  try {
    const user = await prisma.user.findUnique({ where: { uuid: uuid } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const uploadFileToCloudinary = async (file, folder) => {
        const options = { folder, resource_type: 'auto' };
        try {
          const response = await cloudinary.v2.uploader.upload(file, options);
          return response;
        } catch (error) {
          throw error;
        }
      };
    const result = await uploadFileToCloudinary(file)
    await prisma.media.create({
      data: {
        userId: user.uuid,
        url: result.secure_url,
        publicId: result.public_id,
        type:result.resource_type,
      },
    });

    res.json({ url: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteMedia = async (req, res) => {
  const { publicId } = req.body;

  try {
    await cloudinary.uploader.destroy(publicId);
    await prisma.media.delete({ where: { publicId } });

    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getUserMedia = async (req, res) => {
  const { userId, type } = req.params;
  try {
    const user = await prisma.user.findUnique({ where: { uuid: userId } });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    const media = await prisma.media.findMany({
      where: {
        userId: user.uuid,
        type: type
      },
      select: {
        url: true,
        publicId: true,
        type: true
      }
    });
    res.json(media);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const uploadMedias = async (req, res) => {
  const file = req.file;
  if (!file) {
    return res.status(400).json({ error: 'No file uploaded.' });
  }
  const getResourceType = (mimeType) => {
    if (mimeType.startsWith('video/')) {
      return 'video';
    } else if (mimeType.startsWith('image/')) {
      return 'image';
    } else {
      return 'raw';
    }
  };
  try {
    const resourceType = getResourceType(file.mimetype);
    const uploadFileToCloudinary = async (filePath, folder) => {
      const options = { folder, resource_type: resourceType };
      try {
        const response = await cloudinary.v2.uploader.upload(filePath, options);
        return response;
      } catch (error) {
        throw error;
      }
    };
    const result = await uploadFileToCloudinary(file.path, 'media');
    res.json({ data: result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  uploadMedia,
  deleteMedia,
  getUserMedia,
  uploadMedias,
};
