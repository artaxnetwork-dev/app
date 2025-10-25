FROM node:18-ubuntu

# Set user and working directory as recommended for background agents
USER ubuntu
WORKDIR /home/ubuntu

# Install system dependencies and development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    nano \
    htop \
    tree \
    jq \
    unzip \
    zip \
    build-essential \
    python3 \
    python3-pip \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages for Next.js development
RUN npm install -g \
    typescript \
    ts-node \
    @types/node \
    eslint \
    prettier \
    @next/codemod \
    npm-check-updates \
    yarn \
    pnpm

# Install useful development tools
RUN npm install -g \
    nodemon \
    concurrently \
    cross-env \
    dotenv-cli

# Set up Git configuration (you can override these in your environment)
RUN git config --global init.defaultBranch main && \
    git config --global pull.rebase false

# Create common directories
RUN mkdir -p /home/ubuntu/.npm-global && \
    mkdir -p /home/ubuntu/.config

# Set npm global directory
RUN npm config set prefix '/home/ubuntu/.npm-global'

# Add npm global bin to PATH
ENV PATH=/home/ubuntu/.npm-global/bin:$PATH

# Set up environment variables for development
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Expose common development ports
EXPOSE 3000 3001 8080

# Set default command
CMD ["/bin/bash"]
