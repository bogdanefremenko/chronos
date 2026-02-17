import CommitsTable from './components/CommitsTable';
import RepositoryDropdown from './components/RepositoryDropdown';

function App() {
  return (
    <div className="flex h-screen flex-col">
      <div className="grid w-full grid-cols-3 items-center p-4">
        <RepositoryDropdown />
        <header className="text-gradient-animate text-center text-2xl font-bold tracking-widest">
          CHRONOS
        </header>
      </div>
      <div className="flex min-h-0 flex-1 gap-4 p-4">
        <aside className="w-80 min-w-40 shrink overflow-y-auto"></aside>
        <main className="flex-1 overflow-y-auto">
          <CommitsTable />
        </main>
      </div>
    </div>
  );
}

export default App;
