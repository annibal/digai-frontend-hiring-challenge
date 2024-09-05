export default async function blobToFileURL(data: Blob) {
  const fileSrc = await new Promise<string>((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onerror = (evt) => {
      console.error("Load Audio Recording file failed", evt);
      reject("");
    };

    fileReader.onloadend = (evt) => {
      const src = fileReader.result;
      console.info("src", src, fileReader, evt);
      resolve(src as string);
    };

    fileReader.readAsDataURL(data);
  });
  return fileSrc;
}