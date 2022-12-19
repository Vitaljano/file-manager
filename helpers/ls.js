import fs from 'fs/promises';

export const ls = async (dirPath) => {
  try {
    const dirInfo = await fs.readdir(dirPath, {withFileTypes: true});
    const list = [];

    for (const fileInfo of dirInfo){
      
      if(fileInfo.isDirectory()){
        list.push({Name: fileInfo.name, Type: 'directory'});
      }
      if(fileInfo.isFile()){
        list.push({Name: fileInfo.name, Type: 'file'});
      }
    }

   const sortedList = list.sort((a, b) => a.Name < b.Name)
    
   console.table(sortedList);

  } catch (err) {
    throw err;
  }
};
