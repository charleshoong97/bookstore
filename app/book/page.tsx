import { CircularProgress, Stack } from "@mui/material";
import { Suspense } from "react";
import BookItem from "./card";
import { Book } from "./interface";

async function getBooks() {
  const res = await fetch("https://fakerapi.it/api/v1/books");
  const parsedJson = await res.json();
  return parsedJson.data;
}

export default async function Books() {
  const books: Book[] = await getBooks();

  return (
    <Suspense fallback={<CircularProgress size={"50"} />}>
      <Stack gap={3}>
        {books.map((book, index) => (
          <BookItem {...book} key={index} />
        ))}
      </Stack>
    </Suspense>
  );
}
