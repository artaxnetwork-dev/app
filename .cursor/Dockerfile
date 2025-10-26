FROM node:18-ubuntu

# Set user and working directory as recommended for background agents
USER ubuntu
WORKDIR /home/ubuntu

# Install essential development tools
RUN apt-get update && apt-get install -y \
    git \
    curl \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install global npm packages for Next.js development
RUN npm install -g \
    typescript \
    @types/node \
    eslint \
    prettier \
    vercel \
    && npm cache clean --force

# Set up Git configuration
RUN git config --global init.defaultBranch main && \
    git config --global pull.rebase false

# Set up environment variables for development
ENV NODE_ENV=development
ENV NEXT_TELEMETRY_DISABLED=1

# Expose development port
EXPOSE 3000

# Set default command
CMD ["/bin/bash"]
