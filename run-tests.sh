#! /bin/bash

for FILE in $(ls tests)
do
  node tests/$FILE
done
