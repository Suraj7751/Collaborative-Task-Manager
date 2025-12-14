export const errorHandler = (
  err: any,
  req: any,
  res: any,
  next: any
) => {
  console.error(err);

  if (err.name === "ZodError") {
    return res.status(400).json({ errors: err.errors });
  }

  res.status(500).json({
    message: err.message || "Internal Server Error",
  });
};
