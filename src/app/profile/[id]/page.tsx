export default function UserProfile({ params }: any) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 gap-4">
      <span>Profile Page</span>
      <span className="text-4xl">{params.id}</span>
    </div>
  );
}
