import db from '../db';

export default async function checkUsername(username: string): Promise<boolean> {
  const user = await db.user.findUnique({
    where: {
      username,
    },
    select: {
      id: true,
    },
  });

  return Boolean(user);
}
