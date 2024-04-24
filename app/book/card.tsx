"use client";

import {
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
import { Book } from "./interface";
import { useRouter } from "next/navigation";
import moment from "moment";
import stc from "string-to-color";

export default function BookItem(book: Book) {
  const router = useRouter();

  const handleNavigateBook = (id: number) => {
    router.push(`/book/${id}`);
  };

  return (
    <Card>
      <CardActionArea onClick={() => handleNavigateBook(book.id)}>
        <CardContent>
          <Stack mb={2} direction={"row"} justifyContent={"space-between"}>
            <div>
              <Typography variant="h4">{book.title}</Typography>
              <Typography variant="subtitle2">
                ISBN : <strong>{book.isbn}</strong>
              </Typography>
              <Chip
                label={book.genre}
                sx={{ backgroundColor: stc(book.genre), color: "white" }}
              />
            </div>
            <div>
              <Typography variant="body2" textAlign={"right"}>
                {moment(book.published, "YYYY-MM-DD").format("DD/MM/YYYY")}
              </Typography>
              <Typography variant="body2" textAlign={"right"}>
                {book.publisher}
              </Typography>
            </div>
          </Stack>
          <Typography variant="caption">{book.description}</Typography>

          <Typography
            variant="body2"
            fontWeight={"bold"}
            textAlign={"right"}
            sx={{ pt: 2 }}
          >
            By : {book.publisher}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
