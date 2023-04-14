/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "@vercel/og";

export const runtime = "edge";

interface Item {
  name: string;
  top: string;
  left: string;
  color?: string;
}

const hind_shiliguri = fetch(
  new URL("../../assets/HindSiliguri.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const signature_font = fetch(
  new URL("../../assets/signature-font.otf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function og(req: Request) {
  const HindShiliguriData = await hind_shiliguri;
  const SignatureFontData = await signature_font;

  const { searchParams } = new URL(req.url);

  const name = searchParams.get("name");
  const eng_name = searchParams.get("eng_name");
  const father = searchParams.get("father");
  const mother = searchParams.get("mother");
  const date = searchParams.get("date");
  const id = searchParams.get("id");
  const imageURL = searchParams.get("image_url");
  const signature = searchParams.get("signature");

  if (!name) {
    return new Response("Name parameter is required", { status: 404 });
  }
  if (!eng_name) {
    return new Response("eng_name parameter is required", { status: 404 });
  }
  if (!father) {
    return new Response("father parameter is required", { status: 404 });
  }
  if (!mother) {
    return new Response("mother parameter is required", { status: 404 });
  }
  if (!date) {
    return new Response("date parameter is required", { status: 404 });
  }
  if (!id) {
    return new Response("id parameter is required", { status: 404 });
  }
  if (!imageURL) {
    return new Response("image_url parameter is required", { status: 404 });
  }
  if (!signature) {
    return new Response("signature parameter is required", { status: 404 });
  }

  const arr: Item[] = [
    {
      name: name,
      top: "32.4%",
      left: "45%",
    },
    {
      name: eng_name,
      top: "40.5%",
      left: "49%",
    },
    {
      name: father,
      top: "48%",
      left: "46.4%",
    },
    {
      name: mother,
      top: "56%",
      left: "46.4%",
    },
    {
      name: date,
      top: "64.4%",
      left: "57%",
      color: "#e11d48",
    },
    {
      name: id,
      top: "73.3%",
      left: "49.6%",
      color: "#e11d48",
    },
  ];

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100%",
          width: "100%",
          fontFamily: "Hind Shiliguri",
        }}
      >
        <img
          style={{
            position: "relative",
          }}
          width="500"
          height="300"
          src={`${
            process.env.SITE_URL || "http://localhost:3000/"
          }/nid_mockup.jpg`}
          alt=""
        />
        {arr.map((item, i) => (
          <p
            key={i}
            style={{
              position: "absolute",
              top: item.top,
              left: item.left,
              color: item.color || "black",
            }}
          >
            {item.name}
          </p>
        ))}
        {/* signature */}
        <p
          style={{
            position: "absolute",
            top: "69%",
            left: "14%",
            fontFamily: "Signature Font",
            fontSize: "30px",
          }}
        >
          {signature}
        </p>
        {/* person image */}
        <img
          src={imageURL}
          style={{
            position: "absolute",
            top: "39%",
            left: "14%",
          }}
          width={100}
          height={100}
          alt=""
        />
      </div>
    ),
    {
      width: 500,
      height: 300,
      fonts: [
        {
          data: HindShiliguriData,
          name: "Hind Shiliguri",
          style: "normal",
        },
        {
          data: SignatureFontData,
          name: "Signature Font",
          style: "normal",
        },
      ],
    }
  );
}
