import { either as E } from "fp-ts";
import { z } from "zod";

export const parseZ =
  <T>(zodType: z.ZodType<T>) =>
  (v: unknown): E.Either<z.ZodError<T>, T> => {
    const result = zodType.safeParse(v);

    switch (result.success) {
      case true:
        return E.right(result.data);

      case false:
        return E.left(result.error);
    }
  };
