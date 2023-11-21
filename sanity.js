import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const client = createClient({
  projectId: "bbw84viu",
  dataset: "production",
  useCdn: true,
  apiVersion: "2023-10-29",
});

const builder = imageUrlBuilder(client);
export const urlFor = (source) => builder.image(source);
export const getCategory = async () => {
  const items = await client.fetch("*[_type=='category']").then((data) => {
    return data;
  });
  return items;
};

export const getCategoryItems = async (id) => {
  const items = await client
    .fetch(`*[_type=="items" && $id in categories[]->_id]`, { id })
    .then((data) => {
      return data;
    });
  return items;
};

export const getItemById = async (id) => {
  const item = await client
    .fetch(`*[_type=="items" && _id==$id][0]`, { id })
    .then((data) => {
      return data;
    });
  return item;
};
