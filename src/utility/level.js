export default function Levels(user) {
  if (user.xp >= 100 * user.level) {
    return true;
  } else return false;
}
