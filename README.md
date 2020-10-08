# Social Media Web Application

<a href="https://ak-social-media.netlify.app/">Live Demo</a>

This repo contains the code I worked on when working at the Roy Group - University of Waterloo | 2015.
Allows new members to install libraries, and switch between python versions on one or multiple GPUs connected to the server.

## Functions
This script will install either one or both python2 and python3 onto a 'GPU containing' CPU with modules: scipy, numpy, pycuda, scikit-cuda.
- Prevents re-downloading of libraries using file existance checks.
- Creates/appends bash code to .bashrc / .bash_profile and aliases.
- Specify which GPUS to install on.
- Specify Cuda version to install.
- Specify Python version to install.

<img src="Interface.PNG" width="50%">

## Language
- Bash
