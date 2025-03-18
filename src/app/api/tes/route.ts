/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
import { NextResponse } from "next/server";

const downloadImage = async (url: string) => {
  const response = await axios.get(url, { responseType: "arraybuffer" });
  return Buffer.from(response.data, "binary");
};

const uploadImageToStrapi = async (imageBuffer: Buffer, fileName: string) => {
  const formData = new FormData();

  const blob = new Blob([imageBuffer], { type: "jpg" });
  formData.append("files", blob, fileName);

  const response = await axios.post(
    "http://localhost:1337/api/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data[0].id;
};

const postDataToStrapi = async (data: any) => {
  const response = await axios.post(
    "http://localhost:1337/api/kw-news-events",
    {
      data,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );

  return response.data;
};

export const POST = async () => {
  try {
    const query = `
      {
        posts {
          edges {
            node {
              id
              slug
              title
              author {
                node {
                  name
                }
              }
              date
              categories {
                nodes {
                  name
                }
              }
              seo {
                metaKeywords
                metaDesc
                opengraphTitle
                opengraphDescription
                opengraphAuthor
                title
                twitterDescription
                twitterTitle
                twitterImage {
                  altText
                  sourceUrl
                }
              }
              featuredImage {
                node {
                  sourceUrl
                  slug
                  altText
                }
              }
              content(format: RENDERED)
            }
          }
        }
      }
    `;

    const response = await fetch(
      "https://be.kota-wisata.com/wp/index.php?graphql",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
      },
    );

    const result = await response.json();

    const allData = result.data.posts.edges.map((data: any) => ({
      title: data.node.title,
      slug: data.node.slug,
      date_time: data.node.date,
      isNews: data.node.categories.nodes[0].name,
      rich_text: encodeURI(data.node.content),
      image: data.node.featuredImage.node.sourceUrl,
    }));

    for (const data of allData) {
      try {
        console.log(`Memproses data: ${data.title}`);

        const imageBuffer = await downloadImage(data.image);

        const fileName = data.image.split("/").pop();
        const fileId = await uploadImageToStrapi(imageBuffer, fileName);

        const postData = {
          ...data,
          image: fileId,
        };

        const strapiResponse = await postDataToStrapi(postData);

        console.log("Data berhasil diposting:", strapiResponse);
      } catch (error: any) {
        console.error("Error:", error.message);
      }
    }

    return NextResponse.json("Berhasil bang");
  } catch (error) {
    console.error("Internal error", error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
