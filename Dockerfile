# 1. استفاده از Node.js
FROM node:20-alpine

# 2. ایجاد فولدر کاری
WORKDIR /app

# 3. کپی package.json و package-lock.json / yarn.lock
COPY package*.json ./

# 4. نصب وابستگی‌ها
RUN npm install

# 5. کپی کل پروژه
COPY . .

# 6. بیلد پروژه
RUN npm run build

# 7. پورت پیش‌فرض Next.js
EXPOSE 3000

# 8. دستور اجرا
CMD ["npm", "start"]
