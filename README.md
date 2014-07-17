Javascript Hash Trie Benchmarking

Benchmarks 4 Persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.2.x
* [hamt][hamt] -  0.1.x
* [persistent-hash-trie][persistent] - 0.4.x
* [mori][mori] - 0.2.x

### Usage

```
$ npm install
$ npm run benchmark
```


### Benchmarks
* Get entry in map of size N.
* Put entry in map of size N.
* Remove entry from map of size N.

* Put N entries into a map.
* Remove N entries from the map.

* Count number of entries in map of size N.
* Get all keys in map of size N.
* Sum all values in map of size N.

### Results
[results](https://github.com/mattbierner/js-hashtrie-benchmark/wiki/results)

HAMT is fastest overall, with good get, update, and fold performance.

Hashtrie is slightly slower for updates, but up to 10x slower for folds than hashtrie.
Hashtrie's sparse array storage is a [major performance hit](http://jsperf.com/sparse-array-reduce-overhead)
for folds as neither `reduce` or `splice` show good performance for sparse arrays.

Mori's `hash_map` is slow for gets, especially as the size of the map increases.
It is good for updates, but 2-3x slower than hashtrie on large maps. Mori is really
good at aggregate operations, like count and kv reduces. `count` is a constant time
operation. It uses an even more optimized storage scheme than HAMT and is also fast
to fold large maps. The API is also richer, and the library may be a good choice
if you can sacrifice some performance.

persistent-hash-trie has some interesting features, like custom key types and
breaking walks, but is far too slow. Tests show persistent-hash-trie is
the fastest for removing all entries from a trie of size 10000. Since this is
the opposite of puts and single removes, I believe this is related to
a [bug in the library](https://github.com/hughfdjackson/persistent-hash-trie/issues/24).



```
hashtrie - 0.2.2
hamt - 0.1.4
mori - 0.2.6
persistent-hash-trie - 0.4.2


Get nth
native(10)                    :     12072176.12 +/- 1.89% op/s
immutable-trie(10)            :      7747902.09 +/- 0.59% op/s
hashtrie(10)                  :      9691881.47 +/- 0.75% op/s
hamt(10)                      :      9193646.72 +/- 0.71% op/s
persistent-hash-trie(10)      :      5665561.29 +/- 2.70% op/s
mori hash_map(10)             :      1876839.45 +/- 0.96% op/s
morearty Data.Map(10)         :      5861436.48 +/- 0.75% op/s
native(100)                   :     16380369.70 +/- 0.65% op/s
immutable-trie(100)           :      6666599.95 +/- 0.90% op/s
hashtrie(100)                 :      8675060.04 +/- 0.62% op/s
hamt(100)                     :      8390131.79 +/- 0.86% op/s
persistent-hash-trie(100)     :      2971151.13 +/- 0.63% op/s
mori hash_map(100)            :      1508850.09 +/- 5.33% op/s
morearty Data.Map(100)        :      3843317.25 +/- 3.33% op/s
native(1000)                  :     17294399.34 +/- 0.75% op/s
immutable-trie(1000)          :      5221348.53 +/- 0.88% op/s
hashtrie(1000)                :      7502072.94 +/- 0.78% op/s
hamt(1000)                    :      7174340.48 +/- 1.67% op/s
persistent-hash-trie(1000)    :      1578212.64 +/- 1.25% op/s
mori hash_map(1000)           :       870013.38 +/- 2.86% op/s
morearty Data.Map(1000)       :      4045587.83 +/- 0.87% op/s
native(10000)                 :     16911166.73 +/- 1.31% op/s
immutable-trie(10000)         :      4163037.26 +/- 1.28% op/s
hashtrie(10000)               :      4868921.50 +/- 1.31% op/s
hamt(10000)                   :      5349822.59 +/- 2.62% op/s
persistent-hash-trie(10000)   :      1096539.55 +/- 1.51% op/s
mori hash_map(10000)          :       734571.68 +/- 3.83% op/s
morearty Data.Map(10000)      :      2836367.33 +/- 2.08% op/s
native(100000)                :      4322719.40 +/- 0.84% op/s
immutable-trie(100000)        :      1420302.64 +/- 0.59% op/s
hashtrie(100000)              :      1464978.62 +/- 0.70% op/s
hamt(100000)                  :      1586596.96 +/- 0.40% op/s
persistent-hash-trie(100000)  :       905697.38 +/- 0.58% op/s
mori hash_map(100000)         :       499896.32 +/- 3.76% op/s
morearty Data.Map(100000)     :      1203479.84 +/- 0.44% op/s


put nth
native(10)                    :     75997086.31 +/- 1.28% op/s
immutable-trie(10)            :      2996762.57 +/- 1.57% op/s
hashtrie(10)                  :      2345491.98 +/- 1.30% op/s
hamt(10)                      :      2639386.13 +/- 1.16% op/s
persistent-hash-trie(10)      :       413729.63 +/- 1.33% op/s
mori hash_map(10)             :       437799.55 +/- 2.98% op/s
morearty Data.Map(10)         :      1723817.48 +/- 1.24% op/s
native(100)                   :      9297337.53 +/- 0.95% op/s
immutable-trie(100)           :      1685016.55 +/- 3.60% op/s
hashtrie(100)                 :      1681454.19 +/- 1.28% op/s
hamt(100)                     :      1738176.80 +/- 1.09% op/s
persistent-hash-trie(100)     :       169373.04 +/- 1.01% op/s
mori hash_map(100)            :      1079801.60 +/- 1.28% op/s
morearty Data.Map(100)        :      1269793.77 +/- 2.39% op/s
native(1000)                  :      9181380.55 +/- 1.56% op/s
immutable-trie(1000)          :      1561440.88 +/- 1.91% op/s
hashtrie(1000)                :      1340981.35 +/- 1.94% op/s
hamt(1000)                    :      1888983.20 +/- 9.84% op/s
persistent-hash-trie(1000)    :        88240.60 +/- 1.32% op/s
mori hash_map(1000)           :       966391.04 +/- 0.55% op/s
morearty Data.Map(1000)       :      1097181.40 +/- 0.93% op/s
native(10000)                 :      9202441.00 +/- 0.74% op/s
immutable-trie(10000)         :      1309012.33 +/- 1.16% op/s
hashtrie(10000)               :      1003745.28 +/- 1.81% op/s
hamt(10000)                   :      1621081.36 +/- 1.23% op/s
persistent-hash-trie(10000)   :        70525.52 +/- 1.07% op/s
mori hash_map(10000)          :       859524.27 +/- 0.61% op/s
morearty Data.Map(10000)      :       739054.44 +/- 0.57% op/s
native(100000)                :      8919257.40 +/- 0.92% op/s
immutable-trie(100000)        :       999374.12 +/- 0.89% op/s
hashtrie(100000)              :      1180728.53 +/- 0.59% op/s
hamt(100000)                  :      1136306.23 +/- 0.99% op/s
persistent-hash-trie(100000)  :        31693.95 +/- 1.12% op/s
mori hash_map(100000)         :       697907.98 +/- 0.70% op/s
morearty Data.Map(100000)     :       718357.57 +/- 1.29% op/s


Put All
native(10)                    :      2152167.77 +/- 1.19% op/s
immutable-trie(10)            :       314151.65 +/- 0.50% op/s
hashtrie(10)                  :       272378.71 +/- 0.83% op/s
hamt(10)                      :       303893.91 +/- 0.85% op/s
persistent-hash-trie(10)      :        48278.28 +/- 1.04% op/s
mori hash_map(10)             :       131283.00 +/- 0.64% op/s
morearty Data.Map(10)         :       207992.04 +/- 0.90% op/s
native(100)                   :       229033.64 +/- 0.63% op/s
immutable-trie(100)           :        21676.22 +/- 0.55% op/s
hashtrie(100)                 :        19902.86 +/- 1.09% op/s
hamt(100)                     :        20810.95 +/- 1.76% op/s
persistent-hash-trie(100)     :         1395.29 +/- 3.69% op/s
mori hash_map(100)            :         9814.51 +/- 0.70% op/s
morearty Data.Map(100)        :        15443.96 +/- 1.89% op/s
native(1000)                  :        22769.67 +/- 1.04% op/s
immutable-trie(1000)          :         1145.79 +/- 7.40% op/s
hashtrie(1000)                :         1359.09 +/- 4.88% op/s
hamt(1000)                    :         1153.04 +/- 4.35% op/s
persistent-hash-trie(1000)    :           57.29 +/- 5.91% op/s
mori hash_map(1000)           :          366.73 +/- 3.16% op/s
morearty Data.Map(1000)       :         1042.12 +/- 3.30% op/s
native(10000)                 :         2291.72 +/- 0.77% op/s
immutable-trie(10000)         :          110.03 +/- 1.72% op/s
hashtrie(10000)               :          110.62 +/- 0.59% op/s
hamt(10000)                   :          120.32 +/- 0.91% op/s
persistent-hash-trie(10000)   :            6.25 +/- 1.21% op/s
mori hash_map(10000)          :           43.57 +/- 6.08% op/s
morearty Data.Map(10000)      :           83.37 +/- 0.84% op/s


remove nth
native(10)                    :      6758437.82 +/- 1.41% op/s
immutable-trie(10)            :      2160406.38 +/- 1.24% op/s
hashtrie(10)                  :      2446011.51 +/- 8.12% op/s
hamt(10)                      :      2551596.30 +/- 0.72% op/s
persistent-hash-trie(10)      :       228348.52 +/- 0.54% op/s
mori hash_map(10)             :      1301234.52 +/- 1.14% op/s
morearty Data.Map(10)         :      1099799.79 +/- 1.14% op/s
native(100)                   :      7069420.38 +/- 0.57% op/s
immutable-trie(100)           :      2207843.62 +/- 0.78% op/s
hashtrie(100)                 :      1966507.03 +/- 0.88% op/s
hamt(100)                     :      1756427.16 +/- 0.83% op/s
persistent-hash-trie(100)     :        70458.04 +/- 0.64% op/s
mori hash_map(100)            :      1077493.55 +/- 0.92% op/s
morearty Data.Map(100)        :      1033806.24 +/- 0.90% op/s
native(1000)                  :      6996030.65 +/- 1.24% op/s
immutable-trie(1000)          :      1557093.65 +/- 0.82% op/s
hashtrie(1000)                :      1401056.87 +/- 0.77% op/s
hamt(1000)                    :      1658328.76 +/- 0.83% op/s
persistent-hash-trie(1000)    :        44165.70 +/- 0.92% op/s
mori hash_map(1000)           :       554751.49 +/- 1.07% op/s
morearty Data.Map(1000)       :       756799.69 +/- 1.00% op/s
native(10000)                 :      7168728.38 +/- 1.28% op/s
immutable-trie(10000)         :      1059176.56 +/- 0.69% op/s
hashtrie(10000)               :       925176.40 +/- 1.03% op/s
hamt(10000)                   :      1053377.21 +/- 11.11% op/s
persistent-hash-trie(10000)   :        34794.06 +/- 1.02% op/s
mori hash_map(10000)          :       443503.40 +/- 1.19% op/s
morearty Data.Map(10000)      :       529097.64 +/- 5.68% op/s
native(100000)                :      3246533.91 +/- 5.95% op/s
immutable-trie(100000)        :       675139.24 +/- 3.44% op/s
hashtrie(100000)              :       584438.79 +/- 1.43% op/s
hamt(100000)                  :       695551.43 +/- 1.12% op/s
persistent-hash-trie(100000)  :        15963.97 +/- 5.02% op/s
mori hash_map(100000)         :       275401.39 +/- 1.11% op/s
morearty Data.Map(100000)     :       414272.87 +/- 0.83% op/s


Remove All
native(10)                    :      1027962.13 +/- 0.73% op/s
immutable-trie(10)            :       213917.02 +/- 1.07% op/s
hashtrie(10)                  :       275897.28 +/- 1.55% op/s
hamt(10)                      :       336427.79 +/- 0.60% op/s
persistent-hash-trie(10)      :        34315.64 +/- 0.82% op/s
mori hash_map(10)             :       150408.45 +/- 0.74% op/s
morearty Data.Map(10)         :       158638.70 +/- 1.12% op/s
native(100)                   :       101132.35 +/- 0.59% op/s
immutable-trie(100)           :        20108.01 +/- 0.83% op/s
hashtrie(100)                 :        19744.90 +/- 0.77% op/s
hamt(100)                     :        28861.26 +/- 0.67% op/s
persistent-hash-trie(100)     :         2497.39 +/- 0.99% op/s
mori hash_map(100)            :        11169.60 +/- 1.83% op/s
morearty Data.Map(100)        :         9741.71 +/- 0.81% op/s
native(1000)                  :         9929.87 +/- 0.60% op/s
immutable-trie(1000)          :         1391.85 +/- 0.92% op/s
hashtrie(1000)                :         1540.86 +/- 0.89% op/s
hamt(1000)                    :         1979.95 +/- 0.98% op/s
persistent-hash-trie(1000)    :         1149.56 +/- 0.89% op/s
mori hash_map(1000)           :          525.54 +/- 1.18% op/s
morearty Data.Map(1000)       :          723.68 +/- 1.23% op/s
native(10000)                 :          966.14 +/- 0.80% op/s
immutable-trie(10000)         :           96.61 +/- 1.25% op/s
hashtrie(10000)               :           90.69 +/- 0.96% op/s
hamt(10000)                   :          116.50 +/- 0.92% op/s
persistent-hash-trie(10000)   :          317.40 +/- 0.88% op/s
mori hash_map(10000)          :           48.06 +/- 1.51% op/s
morearty Data.Map(10000)      :           53.83 +/- 0.62% op/s


Count
native(10)                    :      2600973.02 +/- 0.69% op/s
immutable-trie(10)            :     57308784.51 +/- 2.01% op/s
hashtrie(10)                  :       382431.49 +/- 0.79% op/s
hamt(10)                      :      8496047.23 +/- 0.69% op/s
persistent-hash-trie(10)      :       285823.67 +/- 0.80% op/s
mori hash_map(10)             :     43229422.86 +/- 1.30% op/s
morearty Data.Map(10)         :       107237.89 +/- 7.27% op/s
native(100)                   :       281948.00 +/- 0.86% op/s
immutable-trie(100)           :     54054281.36 +/- 0.69% op/s
hashtrie(100)                 :        45980.31 +/- 1.08% op/s
hamt(100)                     :       393425.10 +/- 0.60% op/s
persistent-hash-trie(100)     :         7942.11 +/- 0.88% op/s
mori hash_map(100)            :     44027121.51 +/- 0.84% op/s
morearty Data.Map(100)        :        18456.88 +/- 0.62% op/s
native(1000)                  :        22742.91 +/- 0.49% op/s
immutable-trie(1000)          :     53506104.37 +/- 0.91% op/s
hashtrie(1000)                :         4821.86 +/- 1.05% op/s
hamt(1000)                    :        22069.25 +/- 0.70% op/s
persistent-hash-trie(1000)    :          806.53 +/- 7.46% op/s
mori hash_map(1000)           :     43638269.58 +/- 0.60% op/s
morearty Data.Map(1000)       :         1965.13 +/- 0.74% op/s
native(10000)                 :         2569.91 +/- 0.50% op/s
immutable-trie(10000)         :     54708161.30 +/- 1.28% op/s
hashtrie(10000)               :          447.42 +/- 0.66% op/s
hamt(10000)                   :         4276.16 +/- 1.78% op/s
persistent-hash-trie(10000)   :          159.03 +/- 1.45% op/s
mori hash_map(10000)          :     42516033.88 +/- 1.60% op/s
morearty Data.Map(10000)      :          180.28 +/- 1.77% op/s


Sum
native-for-loop(10)           :      2060136.38 +/- 1.24% op/s
native-for-in-loop(10)        :       426812.23 +/- 0.58% op/s
immutable-trie(10)            :      7796384.42 +/- 1.16% op/s
hashtrie(10)                  :       460205.20 +/- 0.63% op/s
hamt(10)                      :      6357301.48 +/- 0.72% op/s
persistent-hash-trie(10)      :       218002.25 +/- 1.27% op/s
mori hash_map(10)             :      1983834.92 +/- 0.79% op/s
morearty Data.Map(10)         :       101198.23 +/- 7.96% op/s
native-for-loop(100)          :       139308.26 +/- 2.35% op/s
native-for-in-loop(100)       :        15276.53 +/- 1.23% op/s
immutable-trie(100)           :       746963.20 +/- 1.03% op/s
hashtrie(100)                 :        61059.47 +/- 1.07% op/s
hamt(100)                     :       506388.01 +/- 1.04% op/s
persistent-hash-trie(100)     :         8100.48 +/- 1.91% op/s
mori hash_map(100)            :       181879.84 +/- 0.90% op/s
morearty Data.Map(100)        :        19636.60 +/- 8.12% op/s
native-for-loop(1000)         :        13618.20 +/- 0.55% op/s
native-for-in-loop(1000)      :         2800.17 +/- 1.07% op/s
immutable-trie(1000)          :        65961.44 +/- 0.77% op/s
hashtrie(1000)                :         4566.55 +/- 0.59% op/s
hamt(1000)                    :        22224.24 +/- 0.74% op/s
persistent-hash-trie(1000)    :          809.01 +/- 0.82% op/s
mori hash_map(1000)           :        13199.27 +/- 2.83% op/s
morearty Data.Map(1000)       :         1719.55 +/- 3.29% op/s
native-for-loop(10000)        :         1489.93 +/- 2.35% op/s
native-for-in-loop(10000)     :          249.29 +/- 3.04% op/s
immutable-trie(10000)         :         5920.02 +/- 1.23% op/s
hashtrie(10000)               :          424.72 +/- 1.31% op/s
hamt(10000)                   :         4678.91 +/- 0.61% op/s
persistent-hash-trie(10000)   :          150.41 +/- 2.23% op/s
mori hash_map(10000)          :         1816.48 +/- 3.12% op/s
morearty Data.Map(10000)      :          183.55 +/- 1.54% op/s


Keys
native(10)                    :      1339650.19 +/- 1.72% op/s
immutable-trie(10)            :      3504116.50 +/- 1.25% op/s
hashtrie(10)                  :       573603.11 +/- 1.51% op/s
hamt(10)                      :      3175875.18 +/- 1.12% op/s
persistent-hash-trie(10)      :       238945.23 +/- 1.00% op/s
mori hash_map(10)             :       353216.35 +/- 12.78% op/s
morearty Data.Map(10)         :       403282.14 +/- 0.56% op/s
native(100)                   :       234001.57 +/- 1.03% op/s
immutable-trie(100)           :       538130.02 +/- 0.81% op/s
hashtrie(100)                 :        50550.79 +/- 0.77% op/s
hamt(100)                     :       347806.00 +/- 1.11% op/s
persistent-hash-trie(100)     :         9685.83 +/- 0.83% op/s
mori hash_map(100)            :        37254.45 +/- 0.98% op/s
morearty Data.Map(100)        :        35884.79 +/- 1.16% op/s
native(1000)                  :        25489.83 +/- 1.27% op/s
immutable-trie(1000)          :        46267.97 +/- 0.71% op/s
hashtrie(1000)                :         4339.17 +/- 0.87% op/s
hamt(1000)                    :        18504.54 +/- 1.15% op/s
persistent-hash-trie(1000)    :          880.40 +/- 0.99% op/s
mori hash_map(1000)           :         2876.18 +/- 1.56% op/s
morearty Data.Map(1000)       :         3224.59 +/- 1.27% op/s
native(10000)                 :         2571.91 +/- 0.79% op/s
immutable-trie(10000)         :         4618.90 +/- 1.63% op/s
hashtrie(10000)               :          406.47 +/- 1.53% op/s
hamt(10000)                   :         3534.46 +/- 1.43% op/s
persistent-hash-trie(10000)   :          159.61 +/- 1.94% op/s
mori hash_map(10000)          :          217.92 +/- 1.92% op/s
morearty Data.Map(10000)      :          290.66 +/- 2.25% op/s
```




[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie