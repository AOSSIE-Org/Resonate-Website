import React from 'react';

const Frames = () => {
    return (
        <div className="flex flex-col mt-16 px-24">
        {/*Frame 1*/}
        <div className="flex flex-row items-center justify-between mx-16">
          <img src="/assets/group.png" alt="" />
          <div className="-mt-20 flex flex-row items-center px-20">
            <p className="text-4xl font-bold h-36 mr-4">1.</p>
            <p className="h-40 text-5xl ">
              Real-time Audio Communication by joining rooms and talking to
              people.
            </p>
          </div>
        </div>

        {/*Frame 2*/}
        <div className="flex flex-row items-center justify-between mx-16">
          <div className="-mt-20 flex flex-row items-center px-16">
            <p className="text-4xl font-bold h-36 mr-4">2.</p>
            <p className="h-40 text-5xl ">
              Ability to create rooms and moderate speakers and events.
            </p>
          </div>
          <img src="/assets/group.png" alt="" />
        </div>

        {/*Frame 3*/}
        <div className="flex flex-row items-center justify-between mx-16">
          <img src="/assets/group.png" alt="" />
          <div className="-mt-20 flex flex-row items-center px-20">
            <p className="text-4xl font-bold h-36 mr-4">3.</p>
            <p className="h-40 text-5xl ">
              Pair chatting to enable users to find random partners to talk to
              in the app.
            </p>
          </div>
        </div>

        {/*Frame 4*/}
        <div className="flex flex-row items-center justify-between mx-16">
          <div className="-mt-20 flex flex-row items-center px-16">
            <p className="text-4xl font-bold h-36 mr-4">4.</p>
            <p className="h-40 text-5xl ">Real-time messaging(Coming Soon)</p>
          </div>
          <img src="/assets/group.png" alt="" />
        </div>
      </div>
    );
}

export default Frames;
