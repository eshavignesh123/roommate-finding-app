export default function MatchProfile({ name, pronouns, location, first, second }) {
  return (
    <div className="flex items-center mb-6 mt-12">
      <img className="w-60 h-80 rounded bg-gray-600 mr-5" src="#" alt="Profile" />
      <div className="flex-1">
        <h1 className="text-2xl font-bold">{name}</h1>
        <p className="text-gray-600">{pronouns}</p>
        <p className="text-gray-600">{location}</p>
        <div className="mt-3 mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I'm looking for</h2>
          <p className="text-gray-400">{first}</p>
        </div>
        <div className="mb-4 bg-gray-800 rounded p-3">
          <h2 className="text-xl font-semibold">I'm allergic to</h2>
          <p className="text-gray-400">{second}</p>
        </div>
      </div>
    </div>
  );
}
