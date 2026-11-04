interface SidebarProfileProps {
  name: string;
  role: string;
  avatarUrl: string;
}

export default function SidebarProfile({
  name,
  role,
  avatarUrl,
}: SidebarProfileProps) {
  return (
    <div id="profile" className="space-y-3">
      <img
        src={avatarUrl}
        alt="Avatar user"
        className="w-10 md:w-16 rounded-full mx-auto"
      />
      <div>
        <h2 className="font-medium text-xs md:text-sm text-center text-teal-500">
          {name}
        </h2>
        <p className="text-xs text-gray-500 text-center">{role}</p>
      </div>
    </div>
  );
}
