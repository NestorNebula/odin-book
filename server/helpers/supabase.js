const createClient = require('@supabase/supabase-js').createClient;
const { decode } = require('base64-arraybuffer');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_PROJECT_URL,
  process.env.SUPABASE_API_KEY
);

const uploadFile = async (file, contentType, path) => {
  const { data, error } = await supabase.storage
    .from('images')
    .upload(path, decode(file.split('base64,')[1]), {
      contentType: `image/${contentType}`,
    });
  if (error || !data || !data.path || !data.fullPath) {
    return {
      link: null,
      error: true,
    };
  } else {
    const { data } = supabase.storage.from('images').getPublicUrl(path);
    if (!data || !data.publicUrl) {
      return {
        link: null,
        error: true,
      };
    }
    return {
      link: data.publicUrl,
      error: false,
    };
  }
};

const deleteFile = async (path) => {
  const { data, error } = await supabase.storage.from('images').remove([path]);
  return {
    success: data && !error,
  };
};

module.exports = { uploadFile, deleteFile };
