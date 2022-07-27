import jwt from "jsonwebtoken";
export const generateToken = (uid) => {
  try {
    const expiresIn = 60 * 15;
    const token = jwt.sign({ uid }, process.env.JWT_SECRET, { expiresIn });
    return { token, expiresIn };
  } catch (error) {
    console.log(error);
  }
};

export const generateRefreshToken = (uid) => {
  const expiresIn = 60 * 60 * 24 * 30;
  try {
    const refreshToken = jwt.sign({ uid }, process.env.JWT_REFRESH, {
      expiresI,
    });
    res.cookie("token", token, {
      httpOnly: true,
      secure: !(process.env.MODE === "developer"),
    });
  } catch (error) {
    console.log(error);
  }
};
