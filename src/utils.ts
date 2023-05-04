import { either as E } from "fp-ts";
import { z } from "zod";

export const parseZ =
  <T>(zodType: z.ZodType<T>) =>
  (v: unknown): E.Either<z.ZodError<T>, T> => {
    return E.tryCatch(
      () => zodType.parse(v),
      (err) => err as z.ZodError<T>
    );
  };
