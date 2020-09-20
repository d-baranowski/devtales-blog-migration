#!/usr/bin/env bash

if [[ "$3" = "dev" ]]
  then
    rm -f /tmp/sgp-data-reset-batch
    echo "Files to load:"
    ls ./$1 | wc -l
    for i in $(ls -t ./$1); do
      cat $1/${i} | marshall >> /tmp/sgp-data-reset-batch 
      echo  $1/${i}
    done
    cat /tmp/sgp-data-reset-batch | batcher $2 "dev"
elif [[ "$3" = "test" ]]
  then
    rm -f /tmp/sgp-data-reset-batch
    echo "Files to load:"
    ls ./$1 | wc -l
    for i in $(ls -t ./$1); do
      cat $1/${i} | marshall >> /tmp/sgp-data-reset-batch 
      echo  $1/${i}
    done
    cat /tmp/sgp-data-reset-batch | batcher $2 "test"
fi
