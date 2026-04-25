export interface Curriculum {
  [tingkatan: string]: {
    [bidang: string]: {
      [sk: string]: string[];
    };
  };
}

export const kurikulumEn: Curriculum = {
  "Tingkatan 4": {
    "1.0 MEASUREMENT": {
      "1.1 Physical Quantities": [
        "1.1.1 Explain physical quantities.",
        "1.1.2 Explain with examples base quantities and derived quantities.",
        "1.1.3 Describe derived quantities in terms of base quantities and S.I. base units.",
        "1.1.4 Explain with examples scalar and vector quantities."
      ],
      "1.2 Scientific Investigation": [
        "1.2.1 Interpret the shape of graphs to determine the relationship between two physical quantities.",
        "1.2.2 Analyze graphs to make conclusions for investigations.",
        "1.2.3 Conduct a scientific investigation and write a complete report through a simple pendulum experiment."
      ]
    },
    "2.0 FORCE AND MOTION I": {
      "2.1 Linear Motion": [
        "2.1.1 Describe the types of linear motion for objects in a state of rest, uniform velocity, and non-uniform velocity.",
        "2.1.2 Determine distance and displacement, speed and velocity, acceleration/deceleration.",
        "2.1.3 Solve problems of linear motion using linear motion equations."
      ],
      "2.2 Linear Motion Graphs": [
        "2.2.1 Interpret types of motion from graphs: (i) displacement-time (ii) velocity-time (iii) acceleration-time.",
        "2.2.2 Analyze displacement-time graphs to determine distance, displacement, and velocity.",
        "2.2.3 Analyze velocity-time graphs to determine distance, displacement, velocity, and acceleration.",
        "2.2.4 Translate and sketch displacement-time graphs to velocity-time graphs and velocity-time graphs to acceleration-time graphs and vice versa.",
        "2.2.5 Solve problems involving linear motion graphs."
      ],
      "2.3 Free Fall Motion": [
        "2.3.1 Explain free fall motion and gravitational acceleration through examples.",
        "2.3.2 Experiment to determine the value of gravitational acceleration.",
        "2.3.3 Solve problems involving the Earth's gravitational acceleration for objects in free fall."
      ],
      "2.4 Inertia": [
        "2.4.1 Explain the concept of inertia through examples.",
        "2.4.2 Experiment to identify the relationship between inertia and mass.",
        "2.4.3 Justify the effects of inertia in daily life."
      ],
      "2.5 Momentum": [
        "2.5.1 Explain momentum, p as the product of mass, m and velocity, v. p = mv.",
        "2.5.2 Apply the Principle of Conservation of Momentum in collisions and explosions."
      ],
      "2.6 Force": [
        "2.6.1 Define force as the rate of change of momentum.",
        "2.6.2 Solve problems involving the formula F = ma."
      ],
      "2.7 Impulse and Impulsive Force": [
        "2.7.1 Communicate to explain impulse and impulsive force.",
        "2.7.2 Solve problems involving impulse and impulsive force."
      ],
      "2.8 Weight": [
        "2.8.1 State weight as the gravitational force acting on an object, W = mg."
      ]
    },
    "3.0 GRAVITATION": {
      "3.1 Newton's Universal Law of Gravitation": [
        "3.1.1 Explain Newton's Universal Law of Gravitation: F = Gm1m2/r2",
        "3.1.2 Solve problems involving Newton's Universal Law of Gravitation for: (i) two stationary bodies on Earth (ii) bodies on the Earth's surface (iii) Earth and satellites (iv) Earth and Sun",
        "3.1.3 Relate gravitational acceleration, g on the Earth's surface with the universal gravitational constant, G.",
        "3.1.4 Justify the importance of knowing the value of gravitational acceleration of planets in the Solar System.",
        "3.1.5 Describe the centripetal force in the motion system of satellites and planets. F = mv2/r",
        "3.1.6 Determine the mass of the Earth and the Sun using Newton's Universal Law of Gravitation formula and centripetal force."
      ],
      "3.2 Kepler's Laws": [
        "3.2.1 Explain Kepler's I, II and III Laws.",
        "3.2.2 Formulate Kepler's Third Law, T2 ∝ r3.",
        "3.2.3 Solve problems using Kepler's Third Law formula."
      ],
      "3.3 Man-made Satellites": [
        "3.3.1 Explain how the orbit of a satellite is maintained at a certain height by using appropriate satellite velocity.",
        "3.3.2 Communicate to explain geostationary and non-geostationary satellites.",
        "3.3.3 Conceptualise escape velocity.",
        "3.3.4 Solve problems involving escape velocity, v for rockets from the surface of the Earth, Moon, Mars and the Sun."
      ]
    },
    "4.0 HEAT": {
      "4.1 Thermal Equilibrium": [
        "4.1.1 Explain through examples thermal equilibrium in daily life.",
        "4.1.2 Calibrate a liquid-in-glass thermometer using two fixed points."
      ],
      "4.2 Specific Heat Capacity": [
        "4.2.1 Explain heat capacity, C.",
        "4.2.2 Define specific heat capacity of a substance, c. c = Q/m(∆θ)",
        "4.2.3 Experiment to determine: (i) Specific heat capacity of water (ii) Specific heat capacity of aluminium.",
        "4.2.4 Communicate to explain applications of specific heat capacity in daily life, materials engineering and natural phenomena.",
        "4.2.5 Solve problems involving specific heat capacity using the formula Q = mc∆θ."
      ],
      "4.3 Specific Latent Heat": [
        "4.3.1 Explain latent heat.",
        "4.3.2 Define: (i) specific latent heat of fusion, lf = Q/m (ii) specific latent heat of vaporization, lv = Q/m",
        "4.3.3 Experiment to determine, (i) specific latent heat of fusion of ice, lf (ii) specific latent heat of vaporization of water, lv.",
        "4.3.4 Communicate to explain applications of specific latent heat in daily life.",
        "4.3.5 Solve problems involving latent heat."
      ],
      "4.4 Gas Laws": [
        "4.4.1 Explain pressure, temperature and volume of gas in terms of the behavior of gas molecules based on the Kinetic Theory of Gases.",
        "4.4.2 Experiment to determine the relationship between pressure and volume for a fixed mass of gas at constant temperature.",
        "4.4.3 Experiment to determine the relationship between volume and temperature for a fixed mass of gas at constant pressure.",
        "4.4.4 Experiment to determine the relationship between pressure and temperature for a fixed mass of gas at constant volume.",
        "4.4.5 Solve problems involving pressure, temperature and volume of a fixed mass of gas using formulas from Gas Laws."
      ]
    },
    "5.0 WAVES": {
      "5.1 Fundamentals of Waves": [
        "5.1.1 Describe waves.",
        "5.1.2 State the types of waves.",
        "5.1.3 Compare transverse waves and longitudinal waves.",
        "5.1.4 Explain the characteristics of waves: (i) Amplitude, A (ii) Period, T (iii) Frequency, f (iv) Wavelength, λ (v) Wave speed, v",
        "5.1.5 Sketch and interpret wave graphs: (i) displacement against time (ii) displacement against distance",
        "5.1.6 Determine wavelength, λ, frequency, f and wave speed, v."
      ],
      "5.2 Damping and Resonance": [
        "5.2.1 Describe damping and resonance for an oscillating/vibrating system.",
        "5.2.2 Justify the effects of resonance on life."
      ],
      "5.3 Reflection of Waves": [
        "5.3.1 Describe reflection of waves in terms of: (i) angle of incidence, i (ii) angle of reflection, r (iii) wavelength, λ (iv) frequency, f (v) speed, v (vi) direction of wave propagation.",
        "5.3.2 Draw a diagram to show the reflection of plane water waves by a plane reflector.",
        "5.3.3 Justify applications of reflection of waves in daily life.",
        "5.3.4 Solve problems involving reflection of waves."
      ],
      "5.4 Refraction of Waves": [
        "5.4.1 Describe refraction of waves in terms of: (i) angle of incidence, i (ii) angle of refraction, r (iii) wavelength, λ (iv) frequency, f (v) speed, v (vi) direction of wave propagation.",
        "5.4.2 Draw a diagram to show the refraction of waves for two different water depths.",
        "5.4.3 Explain natural phenomena caused by refraction of waves in daily life.",
        "5.4.4 Solve problems involving refraction of waves."
      ],
      "5.5 Diffraction of Waves": [
        "5.5.1 Describe diffraction of waves in terms of: (i) angle of incidence, i (ii) angle of diffraction, r (iii) wavelength, λ (iv) frequency, f (v) speed, v (vi) direction of wave propagation.",
        "5.5.2 Determine factors that affect diffraction of waves.",
        "5.5.3 Draw diagrams to show the diffraction pattern of water waves and the effect of diffraction of light.",
        "5.5.4 Explain applications of diffraction of waves in daily life."
      ],
      "5.6 Interference of Waves": [
        "5.6.1 Describe the principle of superposition of waves.",
        "5.6.2 Describe the interference wave patterns for: (i) water (ii) sound (iii) light",
        "5.6.3 Relate λ, a, x and D based on interference wave patterns.",
        "5.6.4 Solve problems involving interference of waves.",
        "5.6.5 Communicate to explain the applications of wave interference in daily life."
      ],
      "5.7 Electromagnetic Waves": [
        "5.7.1 Characterize electromagnetic waves.",
        "5.7.2 State the components of the electromagnetic spectrum in sequence of wavelength and frequency.",
        "5.7.3 Communicate to explain the applications of each component of the electromagnetic spectrum in life."
      ]
    },
    "6.0 LIGHT AND OPTICS": {
      "6.1 Refraction of Light": [
        "6.1.1 Describe the phenomenon of refraction of light.",
        "6.1.2 Explain refractive index, n.",
        "6.1.3 Conceptualize Snell's Law.",
        "6.1.4 Experiment to determine the refractive index, n for a glass or Perspex block.",
        "6.1.5 Explain real depth and apparent depth. n = H/h",
        "6.1.6 Experiment to determine the refractive index using real depth and apparent depth.",
        "6.1.7 Solve problems related to refraction of light."
      ],
      "6.2 Total Internal Reflection": [
        "6.2.1 Explain critical angle and total internal reflection.",
        "6.2.2 Relate critical angle to refractive index, n = 1/sin c.",
        "6.2.3 Communicate to explain natural phenomena and the applications of total internal reflection in daily life.",
        "6.2.4 Solve problems involving total internal reflection."
      ],
      "6.3 Image Formation by Lenses": [
        "6.3.1 Identify convex lens as a converging lens and concave lens as a diverging lens.",
        "6.3.2 Estimate the focal length of a convex lens using a distant object.",
        "6.3.3 Determine the position and characteristics of the image formed by: (i) convex lens (ii) concave lens",
        "6.3.4 State linear magnification, m as: m = v/u"
      ],
      "6.4 Thin Lens Formula": [
        "6.4.1 Experiment to: (i) study the relationship between object distance, u and image distance, v for a convex lens. (ii) determine the focal length of a thin lens using the Lens Formula: 1/f = 1/u + 1/v",
        "6.4.2 Solve problems involving the thin lens formula for convex and concave lenses."
      ],
      "6.5 Optical Instruments": [
        "6.5.1 Justify the application of lenses in optical instruments such as magnifying glass, compound microscope and telescope.",
        "6.5.2 Design and build a compound microscope and a telescope.",
        "6.5.3 Communicate to explain the application of small-sized lenses in optical instrument technology."
      ],
      "6.6 Image Formation by Spherical Mirrors": [
        "6.6.1 Determine the position and characteristics of the image formed by: (i) concave mirror (ii) convex mirror",
        "6.6.2 Communicate to explain the applications of concave and convex mirrors in life."
      ]
    }
  },
  "Tingkatan 5": {
    "1.0 FORCE AND MOTION II": {
      "1.1 Resultant Force": [
        "1.1.1 State the meaning of resultant force.",
        "1.1.2 Determine the resultant force.",
        "1.1.3 Communicate about resultant force, F when an object is: (i) stationary, F = 0 N (ii) moving with uniform velocity, F = 0 N (iii) moving with uniform acceleration, F ≠ 0 N.",
        "1.1.4 Solve problems involving resultant force, mass and acceleration of an object."
      ],
      "1.2 Resolution of Forces": [
        "1.2.1 Describe resolution of forces.",
        "1.2.2 Solve problems involving resultant force and resolution of forces."
      ],
      "1.3 Forces in Equilibrium": [
        "1.3.1 Explain the meaning of forces in equilibrium.",
        "1.3.2 Sketch the triangle of forces for three forces in equilibrium.",
        "1.3.3 Solve problems involving forces in equilibrium."
      ],
      "1.4 Elasticity": [
        "1.4.1 Describe elasticity.",
        "1.4.2 Experiment to find the relationship between force, F and extension of a spring, x.",
        "1.4.3 Communicate about the law relating force, F and extension of a spring, x.",
        "1.4.4 Solve problems involving force and extension of a spring."
      ]
    },
    "2.0 PRESSURE": {
      "2.1 Pressure in Liquids": [
        "2.1.1 Communicate about the concept of pressure in liquids P = hρg.",
        "2.1.2 Experiment to study the factors affecting pressure in liquids.",
        "2.1.3 Solve problems involving pressure in liquids.",
        "2.1.4 Communicate about the applications of pressure in liquids in life."
      ],
      "2.2 Atmospheric Pressure": [
        "2.2.1 Describe atmospheric pressure.",
        "2.2.2 Communicate about the value of atmospheric pressure.",
        "2.2.3 Solve problems in daily life involving various units of pressure.",
        "2.2.4 Describe the effect of atmospheric pressure on objects at high altitudes and depths below sea level."
      ],
      "2.3 Gas Pressure": [
        "2.3.1 Determine gas pressure using a manometer.",
        "2.3.2 Solve problems in daily life involving gas pressure."
      ],
      "2.4 Pascal's Principle": [
        "2.4.1 Describe the principle of transmission of pressure in an enclosed fluid.",
        "2.4.2 Communicate about the hydraulic system as a force multiplier.",
        "2.4.3 Communicate about applications of Pascal's principle in life.",
        "2.4.4 Solve problems in daily life involving Pascal's principle."
      ],
      "2.5 Archimedes' Principle": [
        "2.5.1 Describe the relationship between buoyant force and the difference in liquid pressure at different depths for an immersed object.",
        "2.5.2 Relate equilibrium of forces with the state of buoyancy of an object in a fluid.",
        "2.5.3 Communicate about applications of Archimedes' principle in life.",
        "2.5.4 Solve problems involving Archimedes' principle and buoyancy."
      ],
      "2.6 Bernoulli's Principle": [
        "2.6.1 Describe the effect of fluid velocity on pressure.",
        "2.6.2 Explain that lift force is produced due to difference in pressure caused by difference in fluid velocity.",
        "2.6.3 Communicate about the applications of Bernoulli's principle in life."
      ]
    },
    "3.0 ELECTRICITY": {
      "3.1 Current and Potential Difference": [
        "3.1.1 Explain the meaning of electric field.",
        "3.1.2 Describe electric field strength, E.",
        "3.1.3 Explain the behavior of charged particles in an electric field.",
        "3.1.4 Define electric current.",
        "3.1.5 Define potential difference, V."
      ],
      "3.2 Resistance": [
        "3.2.1 Compare and contrast ohmic and non-ohmic conductors.",
        "3.2.2 Solve problems for series and parallel combination circuits.",
        "3.2.3 Explain the meaning of resistivity of a wire, ρ.",
        "3.2.4 Describe factors affecting the resistance of a wire through experiment and formulate R = ρl/A.",
        "3.2.5 Communicate about the applications of resistivity of a wire in daily life.",
        "3.2.6 Solve problems involving the formula of wire resistance, R = ρl/A."
      ],
      "3.3 Electromotive Force (e.m.f.) and Internal Resistance": [
        "3.3.1 Explain electromotive force, ε.",
        "3.3.2 Explain internal resistance, r.",
        "3.3.3 Experiment to determine e.m.f. and internal resistance of a dry cell.",
        "3.3.4 Solve problems involving e.m.f. and internal resistance of a dry cell."
      ],
      "3.4 Electrical Energy and Power": [
        "3.4.1 Formulate the relationship between electrical energy (E), voltage (V), current (I) and time (t).",
        "3.4.2 Formulate the relationship between power (P), voltage (V) and current (I).",
        "3.4.3 Solve problems in daily life involving electrical energy and power.",
        "3.4.4 Compare the power and rate of energy consumption of various electrical appliances.",
        "3.4.5 Suggest steps to save electrical energy usage at home."
      ]
    },
    "4.0 ELECTROMAGNETISM": {
      "4.1 Force on a Current-Carrying Conductor in a Magnetic Field": [
        "4.1.1 Describe the effect of a current-carrying conductor in a magnetic field.",
        "4.1.2 Draw the pattern of the resultant magnetic field (catapult field) to determine the direction of force acting on a current-carrying conductor in a magnetic field.",
        "4.1.3 Explain the factors affecting the magnitude of the force acting on a current-carrying conductor in a magnetic field.",
        "4.1.4 Describe the effect of a current-carrying coil in a magnetic field.",
        "4.1.5 Describe the working principle of a direct current motor.",
        "4.1.6 Describe factors affecting the speed of rotation of an electric motor."
      ],
      "4.2 Electromagnetic Induction": [
        "4.2.1 Describe electromagnetic induction in a: (i) straight wire (ii) solenoid.",
        "4.2.2 Explain factors affecting the magnitude of induced e.m.f.",
        "4.2.3 Determine the direction of induced current in a: (i) straight wire (ii) solenoid.",
        "4.2.4 Design a direct current generator and an alternating current generator."
      ],
      "4.3 Transformer": [
        "4.3.1 Describe the working principle of a simple transformer.",
        "4.3.2 Describe the meaning of an ideal transformer.",
        "4.3.3 Describe energy losses and ways to increase the efficiency of a transformer.",
        "4.3.4 Communicate about the uses of transformers in daily life."
      ]
    },
    "5.0 ELECTRONICS": {
      "5.1 Electron": [
        "5.1.1 Explain thermionic emission and cathode rays.",
        "5.1.2 Explain the effect of cathode rays under the influence of an electric field and a magnetic field.",
        "5.1.3 Determine the velocity of electrons in a cathode ray tube."
      ],
      "5.2 Semiconductor Diode": [
        "5.2.1 Describe the function of a semiconductor diode.",
        "5.2.2 Communicate about the uses of semiconductor diodes and capacitors in the rectification of alternating current."
      ],
      "5.3 Transistor": [
        "5.3.1 Describe the function and uses of a transistor as a current amplifier.",
        "5.3.2 Describe a circuit containing a transistor as an automatic switch."
      ]
    },
    "6.0 NUCLEAR PHYSICS": {
      "6.1 Radioactive Decay": [
        "6.1.1 Explain with examples decay equations for: (i) α decay, (ii) β decay, (iii) γ decay.",
        "6.1.2 Explain with examples the meaning of half-life.",
        "6.1.3 Determine the half-life of a radioactive source from a decay curve.",
        "6.1.4 Solve daily life problems involving half-life."
      ],
      "6.2 Nuclear Energy": [
        "6.2.1 Communicate about nuclear reactions: (i) nuclear fission, (ii) nuclear fusion.",
        "6.2.2 Describe the relationship between energy released during a nuclear reaction and mass defect: E = mc2.",
        "6.2.3 Solve problems involving nuclear energy from radioactive decay and nuclear reactions.",
        "6.2.4 Describe the generation of electrical energy in a nuclear reactor.",
        "6.2.5 Justify the use of nuclear energy as an alternative energy to generate electrical energy."
      ]
    },
    "7.0 QUANTUM PHYSICS": {
      "7.1 Quantum Theory of Light": [
        "7.1.1 Explain the background of the spark of the quantum theory idea.",
        "7.1.2 State the meaning of quantum of energy.",
        "7.1.3 Explain wave-particle duality.",
        "7.1.4 Explain the concept of a photon.",
        "7.1.5 Solve problems for (i) photon energy, E=hf, (ii) power, P=nhf ; n is the number of photons emitted per second."
      ],
      "7.2 Photoelectric Effect": [
        "7.2.1 Explain the photoelectric effect.",
        "7.2.2 Identify four characteristics of the photoelectric effect that cannot be explained using the wave theory."
      ],
      "7.3 Einstein's Photoelectric Theory": [
        "7.3.1 State the minimum work function required by a metal to emit electrons using Einstein's equation: hf = W + (1/2)mv2",
        "7.3.2 Explain threshold frequency, fo and work function, W.",
        "7.3.3 Determine the work function of a metal based on the formula, W = hfo.",
        "7.3.4 Solve problems involving Einstein's equation for the photoelectric effect hf = W + (1/2)mv2.",
        "7.3.5 Explain the production of photoelectric current in a photocell circuit.",
        "7.3.6 Describe the applications of the photoelectric effect."
      ]
    }
  }
};
