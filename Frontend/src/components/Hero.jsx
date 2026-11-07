import heroImage from "../assets/hero-image.png"

const Hero = () => {
  return (
    <section
      id="home"
      className="
        relative flex min-h-screen
        items-center
        overflow-hidden
        bg-black
      "
    >

      {/* Background Image */}
      <div
        className="
          absolute inset-0
          bg-cover bg-center
          bg-no-repeat
        "
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      />

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Cinematic Gradient */}
      <div
        className="
          absolute inset-0
          bg-gradient-to-b
          from-black/70
          via-black/30
          to-black/90
        "
      />

      {/* HERO CONTENT */}
      <div
        className="
          relative z-10
          w-full
          px-[clamp(2rem,8vw,8rem)]
          pt-24
        "
      >

        <div className="max-w-[900px]">

          {/* Small Label */}
          <div
            className="
              mb-6
              flex items-center gap-3
              text-xs font-bold uppercase
              tracking-[0.25em]
              text-[#c8ff00]
            "
          >
            <span className="h-[2px] w-10 bg-[#c8ff00]" />

            <span>
              Premium Fitness Club
            </span>
          </div>


          {/* Main Heading */}
          <h1
            className="
              text-[clamp(3.5rem,8vw,8rem)]
              font-black
              uppercase
              leading-[0.82]
              tracking-[-0.06em]
              text-white
            "
          >
            Transform
            <br />

            <span className="text-[#c8ff00]">
              Body
            </span>

            <span className="text-white">
              {" "} & Mind.
            </span>
          </h1>


          {/* Description */}
          <p
            className="
              mt-8
              max-w-[620px]
              text-sm
              leading-7
              text-white/70
              sm:text-base
            "
          >
            Push your limits with elite training programs,
            world-class equipment, and a community that
            drives results.
          </p>


          {/* CTA */}
          <div
            className="
              mt-9
              flex flex-wrap
              items-center
              gap-5
            "
          >

            {/* Primary CTA */}
            <a
              href="#join"
              className="
                group
                flex items-center gap-4
                bg-[#c8ff00]
                px-7 py-4
                text-xs font-black
                uppercase tracking-wider
                text-black
                transition-all duration-300
                hover:bg-white
              "
            >
              <span>
                Start Training
              </span>

              <span
                className="
                  text-lg leading-none
                  transition-transform duration-300
                  group-hover:translate-x-1
                "
              >
                →
              </span>
            </a>


            {/* Secondary CTA */}
            <a
              href="#programs"
              className="
                border-b border-white/40
                pb-1
                text-xs font-bold
                uppercase tracking-wider
                text-white
                transition-all duration-300
                hover:border-[#c8ff00]
                hover:text-[#c8ff00]
              "
            >
              Explore Programs
            </a>

          </div>

        </div>

      </div>


      {/* BOTTOM STATS */}
      <div
        className="
          absolute
          bottom-8
          left-0
          z-10
          w-full
        "
      >

        <div
          className="
            flex w-full
            items-end justify-between
            px-[clamp(2rem,8vw,8rem)]
          "
        >

          {/* Stats */}
          <div
            className="
              flex items-center
              gap-8 sm:gap-10
            "
          >

            {/* Members */}
            <div>
              <p
                className="
                  text-2xl
                  font-black
                  leading-none
                  text-white
                "
              >
                500+
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/45
                "
              >
                Members
              </p>
            </div>


            {/* Trainers */}
            <div>
              <p
                className="
                  text-2xl
                  font-black
                  leading-none
                  text-white
                "
              >
                20+
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/45
                "
              >
                Trainers
              </p>
            </div>


            {/* Access */}
            <div>
              <p
                className="
                  text-2xl
                  font-black
                  leading-none
                  text-white
                "
              >
                24/7
              </p>

              <p
                className="
                  mt-2
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-[0.18em]
                  text-white/45
                "
              >
                Access
              </p>
            </div>

          </div>


          {/* Scroll */}
          <a
            href="#about"
            className="
              flex flex-col
              items-center
              gap-2
              text-[#c8ff00]
              transition-opacity
              duration-300
              hover:opacity-70
            "
          >

            <span
              className="
                text-[9px]
                font-bold
                uppercase
                tracking-[0.3em]
                text-white/50
              "
            >
              Scroll
            </span>

            <span
              className="
                text-3xl
                leading-none
                animate-bounce
              "
            >
              ↓
            </span>

          </a>

        </div>

      </div>

    </section>
  )
}

export default Hero