import { ArrowBack } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  CircularProgress,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import { Book } from "../interface";

interface Param {
  id: string;
}

export async function generateStaticParams() {
  return [
    { id: "1" },
    { id: "2" },
    { id: "3" },
    { id: "4" },
    { id: "5" },
    { id: "6" },
    { id: "7" },
    { id: "8" },
    { id: "9" },
    { id: "10" },
  ];
}

async function getBooks(params: string) {
  const res = await fetch("https://fakerapi.it/api/v1/books");
  const parsedJson = await res.json();
  const books: Book[] = parsedJson.data;

  const currentBook = books.filter((b) => b.id.toString() === params)[0];

  const res2 = await fetch(currentBook.image);
  const blob = await res2.blob();
  if (!blob.type.startsWith("image/")) {
    currentBook.image = "/not-found.png";
  }

  return books.filter((b) => b.id.toString() === params)[0];
}

export default async function BookDetails({ params }: { params: Param }) {
  const details = await getBooks(params.id);

  return (
    <div>
      <Link href={"/book"}>
        <ArrowBack sx={{ color: "black" }} />
      </Link>
      <Suspense fallback={<CircularProgress />}>
        <Card sx={{ mt: 4 }}>
          <CardContent>
            <Box
              width={150}
              height={100}
              borderRadius={5}
              borderColor={"black"}
              mb={2}
            >
              <Image
                alt={details.title}
                width={170}
                height={100}
                src={details.image}
              />
            </Box>
            <Typography fontWeight={800}>{details.title}</Typography>
            <Box mb={2}>
              <Typography
                variant="caption"
                sx={{ fontStyle: "italic", color: "grey" }}
              >
                `{details.description}`
              </Typography>
            </Box>
            <LabelValue label="Author" value={details.author} />
            <LabelValue label="Genre" value={details.genre} />
            <LabelValue label="ISBN" value={details.isbn} />
            <LabelValue
              label="Published Date"
              value={moment(details.published, "YYYY-MM-DD").format(
                "DD/MM/YYYY"
              )}
            />
            <LabelValue label="Publisher" value={details.publisher} />
          </CardContent>
        </Card>
      </Suspense>
    </div>
  );
}

const LabelValue = ({ label, value }: { label: string; value: string }) => {
  return (
    <Stack direction={"row"}>
      <Typography variant="body1" minWidth={130}>
        {label}
      </Typography>
      <Typography variant="body1">: {value}</Typography>
    </Stack>
  );
};
