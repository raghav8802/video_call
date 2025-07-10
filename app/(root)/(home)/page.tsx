import MeetingTypeList from '@/components/MeetingTypeList';

const Home = () => {
  const now = new Date();

  const time = now.toLocaleTimeString('en-IN', { 
    hour: '2-digit', 
    minute: '2-digit',
    timeZone: 'Asia/Kolkata'
  });
  const date = (new Intl.DateTimeFormat('en-IN', { 
    dateStyle: 'full',
    timeZone: 'Asia/Kolkata'
  })).format(now);

  return (
    <section className="flex size-full flex-col gap-5 text-white">
      <div className="h-[303px] w-full rounded-[20px] bg-hero bg-cover">
        <div className="flex h-full flex-col justify-between max-md:px-5 max-md:py-8 lg:p-11">
          <h2 className="glassmorphism max-w-[273px] rounded py-2 text-center text-base font-normal">
          </h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 mb-4">
              <img src="/icons/logo.svg" alt="Logo" className="w-8 h-8 lg:w-10 lg:h-10" />
              <span className="text-xl font-bold text-white lg:text-2xl">Yoom</span>
            </div>
            <p className="text-lg font-medium text-sky-1 lg:text-xl">Name your next meeting</p>
            <h1 className="text-4xl font-extrabold lg:text-7xl">{time}</h1>
            <p className="text-lg font-medium text-sky-1 lg:text-2xl">{date}</p>
          </div>
        </div>
      </div>

      <MeetingTypeList />
    </section>
  );
};

export default Home;
