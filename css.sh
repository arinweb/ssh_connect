#!/bin/bash
#read -p "Derlenicek Dosya Adı: " inFile
#read -p "Derlenen Dosya Adı: " outFile
inFile="style.scss"
outFile="style.css"
read -p "Sıkıştırılma Türü (Y/N): " minify
echo "Derleme Başladı"

if [ -z $inFile ] || [ -z $outFile ]
then
 echo "is"
else
 if [ $minify == "y" ]
 then
  sass --no-source-map -w ${inFile}:${outFile} --style=compressed
 else
  sass --no-source-map -w ${inFile}:${outFile}
 fi
fi