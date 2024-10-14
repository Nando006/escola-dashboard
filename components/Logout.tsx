import { handleLogout } from "../server/nhost/handleLogout";

export default function LogoutButton() {

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
    >
      "Logout"
    </button>
  );
}