Javascript Hash Trie Benchmarking

Benchmarks 6 Persistent Javascript hashtrie implementations:
* [hashtrie][hashtrie] - 0.2.x
* [hamt][hamt] -  0.1.x
* [persistent-hash-trie][persistent] - 0.4.x
* [mori][mori] - 0.2.x
* [immutable-map][immutable-map] - 0.1.1
* [morearty][morearty] - 0.1.8

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
immutable-map - 0.1.1
morearty - 0.1.8

Get nth
native(10)                    :     12559361.34 +/- 1.97% op/s
hashtrie(10)                  :      9804168.41 +/- 0.91% op/s
hamt(10)                      :      9001004.66 +/- 1.10% op/s
persistent-hash-trie(10)      :      5035283.41 +/- 1.21% op/s
mori hash_map(10)             :      1675178.41 +/- 1.10% op/s
immutable-map(10)             :      7856521.66 +/- 0.87% op/s
morearty Data.Map(10)         :      5878084.37 +/- 0.70% op/s
native(100)                   :     15727318.48 +/- 0.58% op/s
hashtrie(100)                 :      8409499.82 +/- 1.01% op/s
hamt(100)                     :      7888233.20 +/- 0.89% op/s
persistent-hash-trie(100)     :      2632415.80 +/- 1.18% op/s
mori hash_map(100)            :      1778616.16 +/- 2.13% op/s
immutable-map(100)            :      6858546.30 +/- 0.48% op/s
morearty Data.Map(100)        :      5085110.31 +/- 1.78% op/s
native(1000)                  :     18012068.31 +/- 0.90% op/s
hashtrie(1000)                :      7597091.50 +/- 0.96% op/s
hamt(1000)                    :      6794706.11 +/- 0.90% op/s
persistent-hash-trie(1000)    :      1577018.59 +/- 1.98% op/s
mori hash_map(1000)           :       847670.67 +/- 2.75% op/s
immutable-map(1000)           :      5671658.49 +/- 1.68% op/s
morearty Data.Map(1000)       :      3968091.65 +/- 0.68% op/s
native(10000)                 :     17729313.63 +/- 0.49% op/s
hashtrie(10000)               :      4922049.28 +/- 1.58% op/s
hamt(10000)                   :      5598274.09 +/- 1.06% op/s
persistent-hash-trie(10000)   :      1108917.16 +/- 1.63% op/s
mori hash_map(10000)          :       716020.76 +/- 2.61% op/s
immutable-map(10000)          :      4511777.68 +/- 0.64% op/s
morearty Data.Map(10000)      :      2929237.30 +/- 0.89% op/s
native(100000)                :      4390036.93 +/- 0.34% op/s
hashtrie(100000)              :      1468281.61 +/- 0.61% op/s
hamt(100000)                  :      1547672.43 +/- 0.41% op/s
persistent-hash-trie(100000)  :       904355.64 +/- 0.74% op/s
mori hash_map(100000)         :       469049.85 +/- 4.15% op/s
immutable-map(100000)         :      1409221.06 +/- 0.42% op/s
morearty Data.Map(100000)     :      1214325.78 +/- 0.44% op/s


put nth
native(10)                    :     73542566.91 +/- 2.00% op/s
hashtrie(10)                  :      3189295.43 +/- 18.01% op/s
hamt(10)                      :      2779852.90 +/- 0.63% op/s
persistent-hash-trie(10)      :       363691.63 +/- 0.59% op/s
mori hash_map(10)             :      1204523.00 +/- 0.82% op/s
immutable-map(10)             :      1911833.30 +/- 0.62% op/s
morearty Data.Map(10)         :      2805605.69 +/- 0.54% op/s
native(100)                   :      8575470.14 +/- 0.52% op/s
hashtrie(100)                 :      1745891.64 +/- 0.51% op/s
hamt(100)                     :      2027822.50 +/- 0.48% op/s
persistent-hash-trie(100)     :       116831.33 +/- 0.58% op/s
mori hash_map(100)            :      1119565.77 +/- 0.52% op/s
immutable-map(100)            :      1303387.88 +/- 0.59% op/s
morearty Data.Map(100)        :      1218064.63 +/- 0.57% op/s
native(1000)                  :      9979046.89 +/- 0.71% op/s
hashtrie(1000)                :      1892888.58 +/- 0.54% op/s
hamt(1000)                    :      2134480.94 +/- 0.48% op/s
persistent-hash-trie(1000)    :        81912.59 +/- 0.52% op/s
mori hash_map(1000)           :       921860.83 +/- 0.64% op/s
immutable-map(1000)           :      1208816.12 +/- 0.54% op/s
morearty Data.Map(1000)       :      1304467.00 +/- 0.46% op/s
native(10000)                 :      9490635.80 +/- 0.56% op/s
hashtrie(10000)               :      1071433.25 +/- 0.59% op/s
hamt(10000)                   :      1156463.00 +/- 0.43% op/s
persistent-hash-trie(10000)   :        70958.18 +/- 0.66% op/s
mori hash_map(10000)          :       825909.69 +/- 0.51% op/s
immutable-map(10000)          :       755291.28 +/- 2.74% op/s
morearty Data.Map(10000)      :       731381.74 +/- 0.71% op/s
native(100000)                :      9972661.24 +/- 0.55% op/s
hashtrie(100000)              :       985971.20 +/- 0.51% op/s
hamt(100000)                  :      1061909.61 +/- 10.15% op/s
persistent-hash-trie(100000)  :        30143.10 +/- 0.72% op/s
mori hash_map(100000)         :       733142.37 +/- 0.54% op/s
immutable-map(100000)         :       805468.04 +/- 0.71% op/s
morearty Data.Map(100000)     :       733479.88 +/- 0.55% op/s


Put All
native(10)                    :      2190081.44 +/- 0.79% op/s
hashtrie(10)                  :       349676.17 +/- 0.57% op/s
hamt(10)                      :       310571.66 +/- 1.08% op/s
persistent-hash-trie(10)      :        54230.66 +/- 0.56% op/s
mori hash_map(10)             :       135151.06 +/- 0.72% op/s
immutable-map(10)             :       198376.75 +/- 0.60% op/s
morearty Data.Map(10)         :       259288.86 +/- 0.89% op/s
native(100)                   :       233363.49 +/- 0.57% op/s
hashtrie(100)                 :        21361.46 +/- 0.61% op/s
hamt(100)                     :        23698.72 +/- 0.65% op/s
persistent-hash-trie(100)     :         1485.68 +/- 0.48% op/s
mori hash_map(100)            :         8389.84 +/- 0.84% op/s
immutable-map(100)            :        15179.94 +/- 0.73% op/s
morearty Data.Map(100)        :        15649.40 +/- 0.53% op/s
native(1000)                  :        23383.96 +/- 0.62% op/s
hashtrie(1000)                :         1626.28 +/- 1.55% op/s
hamt(1000)                    :         1720.08 +/- 0.61% op/s
persistent-hash-trie(1000)    :           85.78 +/- 0.53% op/s
mori hash_map(1000)           :          405.58 +/- 0.75% op/s
immutable-map(1000)           :         1200.97 +/- 0.61% op/s
morearty Data.Map(1000)       :         1090.19 +/- 4.40% op/s
native(10000)                 :         2352.93 +/- 0.51% op/s
hashtrie(10000)               :          109.08 +/- 0.47% op/s
hamt(10000)                   :          124.39 +/- 6.26% op/s
persistent-hash-trie(10000)   :            6.45 +/- 0.71% op/s
mori hash_map(10000)          :           46.45 +/- 0.90% op/s
immutable-map(10000)          :           94.13 +/- 1.41% op/s
morearty Data.Map(10000)      :           87.03 +/- 0.48% op/s


remove nth
native(10)                    :      7235663.19 +/- 0.48% op/s
hashtrie(10)                  :      2871350.10 +/- 0.68% op/s
hamt(10)                      :      3087340.80 +/- 0.42% op/s
persistent-hash-trie(10)      :       169262.57 +/- 0.54% op/s
mori hash_map(10)             :      1171873.37 +/- 0.46% op/s
immutable-map(10)             :      1448584.13 +/- 0.82% op/s
morearty Data.Map(10)         :      1495494.30 +/- 0.49% op/s
native(100)                   :      7056660.20 +/- 1.01% op/s
hashtrie(100)                 :      2027546.57 +/- 0.59% op/s
hamt(100)                     :      2199978.39 +/- 0.56% op/s
persistent-hash-trie(100)     :        64469.91 +/- 0.52% op/s
mori hash_map(100)            :      1010774.88 +/- 0.59% op/s
immutable-map(100)            :      1322749.56 +/- 0.62% op/s
morearty Data.Map(100)        :      1094000.68 +/- 0.48% op/s
native(1000)                  :      7032882.17 +/- 0.63% op/s
hashtrie(1000)                :      1496037.43 +/- 0.65% op/s
hamt(1000)                    :      1838029.64 +/- 2.00% op/s
persistent-hash-trie(1000)    :        44031.66 +/- 1.18% op/s
mori hash_map(1000)           :       453475.48 +/- 9.55% op/s
immutable-map(1000)           :       993734.74 +/- 0.86% op/s
morearty Data.Map(1000)       :       889579.10 +/- 0.60% op/s
native(10000)                 :      7340514.35 +/- 0.67% op/s
hashtrie(10000)               :      1053591.28 +/- 0.50% op/s
hamt(10000)                   :      1261330.80 +/- 0.52% op/s
persistent-hash-trie(10000)   :        36043.94 +/- 0.52% op/s
mori hash_map(10000)          :       424898.08 +/- 0.62% op/s
immutable-map(10000)          :       861367.72 +/- 0.51% op/s
morearty Data.Map(10000)      :       616960.80 +/- 0.65% op/s
native(100000)                :      4238197.99 +/- 2.34% op/s
hashtrie(100000)              :       608813.30 +/- 2.32% op/s
hamt(100000)                  :       721291.29 +/- 0.75% op/s
persistent-hash-trie(100000)  :        16000.21 +/- 4.56% op/s
mori hash_map(100000)         :       219066.97 +/- 11.80% op/s
immutable-map(100000)         :       627187.78 +/- 1.90% op/s
morearty Data.Map(100000)     :       316767.63 +/- 7.68% op/s


Remove All
native(10)                    :       918181.72 +/- 2.49% op/s
hashtrie(10)                  :       280336.66 +/- 1.75% op/s
hamt(10)                      :       381341.49 +/- 1.20% op/s
persistent-hash-trie(10)      :        35110.57 +/- 2.90% op/s
mori hash_map(10)             :       125966.80 +/- 2.59% op/s
immutable-map(10)             :       134312.29 +/- 3.44% op/s
morearty Data.Map(10)         :       159554.62 +/- 1.31% op/s
native(100)                   :        99255.00 +/- 0.47% op/s
hashtrie(100)                 :        20994.13 +/- 0.51% op/s
hamt(100)                     :        28889.94 +/- 1.20% op/s
persistent-hash-trie(100)     :         2502.62 +/- 1.67% op/s
mori hash_map(100)            :         9547.52 +/- 0.61% op/s
immutable-map(100)            :        12594.12 +/- 2.49% op/s
morearty Data.Map(100)        :        11065.26 +/- 2.95% op/s
native(1000)                  :        10180.96 +/- 0.81% op/s
hashtrie(1000)                :         1359.04 +/- 1.89% op/s
hamt(1000)                    :         1925.97 +/- 2.53% op/s
persistent-hash-trie(1000)    :         1245.24 +/- 1.95% op/s
mori hash_map(1000)           :          481.74 +/- 5.09% op/s
immutable-map(1000)           :         1011.67 +/- 3.45% op/s
morearty Data.Map(1000)       :          931.73 +/- 0.58% op/s
native(10000)                 :         1073.85 +/- 0.57% op/s
hashtrie(10000)               :           95.66 +/- 0.73% op/s
hamt(10000)                   :          117.98 +/- 0.80% op/s
persistent-hash-trie(10000)   :          350.93 +/- 0.43% op/s
mori hash_map(10000)          :           45.75 +/- 0.90% op/s
immutable-map(10000)          :           80.88 +/- 0.66% op/s
morearty Data.Map(10000)      :           59.83 +/- 2.55% op/s


Count
native(10)                    :      2489331.23 +/- 2.20% op/s
hashtrie(10)                  :       454454.29 +/- 1.94% op/s
hamt(10)                      :     10937720.74 +/- 2.61% op/s
persistent-hash-trie(10)      :       281199.23 +/- 0.63% op/s
mori hash_map(10)             :     42845228.20 +/- 1.32% op/s
immutable-map(10)             :     70420267.69 +/- 1.63% op/s
morearty Data.Map(10)         :       110122.93 +/- 4.56% op/s
native(100)                   :       273585.27 +/- 3.27% op/s
hashtrie(100)                 :        60899.57 +/- 0.67% op/s
hamt(100)                     :       615393.84 +/- 3.18% op/s
persistent-hash-trie(100)     :         7209.26 +/- 3.43% op/s
mori hash_map(100)            :     39709835.83 +/- 1.66% op/s
immutable-map(100)            :     68142887.78 +/- 1.27% op/s
morearty Data.Map(100)        :        17392.79 +/- 2.26% op/s
native(1000)                  :        22097.50 +/- 1.81% op/s
hashtrie(1000)                :         4208.32 +/- 3.39% op/s
hamt(1000)                    :        24644.87 +/- 3.30% op/s
persistent-hash-trie(1000)    :          800.02 +/- 1.69% op/s
mori hash_map(1000)           :     43199356.04 +/- 1.57% op/s
immutable-map(1000)           :     67651601.53 +/- 1.24% op/s
morearty Data.Map(1000)       :         1666.52 +/- 2.81% op/s
native(10000)                 :         2578.35 +/- 0.45% op/s
hashtrie(10000)               :          426.22 +/- 0.59% op/s
hamt(10000)                   :         6309.43 +/- 0.49% op/s
persistent-hash-trie(10000)   :          167.63 +/- 1.59% op/s
mori hash_map(10000)          :     41684258.10 +/- 2.06% op/s
immutable-map(10000)          :     61745519.08 +/- 3.38% op/s
morearty Data.Map(10000)      :          140.38 +/- 5.20% op/s


Sum
native-for-loop(10)           :      2103433.75 +/- 2.96% op/s
native-for-in-loop(10)        :       457467.83 +/- 2.37% op/s
hashtrie(10)                  :       458090.69 +/- 3.57% op/s
hamt(10)                      :      7096308.48 +/- 3.42% op/s
persistent-hash-trie(10)      :       303287.15 +/- 4.01% op/s
mori hash_map(10)             :      1799310.60 +/- 1.43% op/s
immutable-map(10)             :      7756689.17 +/- 2.92% op/s
morearty Data.Map(10)         :       110087.53 +/- 5.28% op/s
native-for-loop(100)          :       318919.37 +/- 0.70% op/s
native-for-in-loop(100)       :        29205.61 +/- 1.75% op/s
hashtrie(100)                 :        44563.90 +/- 2.42% op/s
hamt(100)                     :       520062.92 +/- 1.18% op/s
persistent-hash-trie(100)     :         7745.86 +/- 0.56% op/s
mori hash_map(100)            :       183212.15 +/- 0.52% op/s
immutable-map(100)            :       812640.81 +/- 0.74% op/s
morearty Data.Map(100)        :        16157.11 +/- 0.78% op/s
native-for-loop(1000)         :        34751.83 +/- 0.50% op/s
native-for-in-loop(1000)      :         2742.65 +/- 0.88% op/s
hashtrie(1000)                :         4711.25 +/- 0.55% op/s
hamt(1000)                    :        21557.26 +/- 0.38% op/s
persistent-hash-trie(1000)    :          842.45 +/- 0.87% op/s
mori hash_map(1000)           :        14350.55 +/- 0.65% op/s
immutable-map(1000)           :        65345.91 +/- 0.45% op/s
morearty Data.Map(1000)       :         1698.09 +/- 2.10% op/s
native-for-loop(10000)        :         4909.91 +/- 0.46% op/s
native-for-in-loop(10000)     :          271.11 +/- 1.58% op/s
hashtrie(10000)               :          429.03 +/- 1.18% op/s
hamt(10000)                   :         4749.54 +/- 1.82% op/s
persistent-hash-trie(10000)   :          167.76 +/- 1.56% op/s
mori hash_map(10000)          :         1938.29 +/- 1.03% op/s
immutable-map(10000)          :         6578.18 +/- 0.51% op/s
morearty Data.Map(10000)      :          162.42 +/- 1.14% op/s


Keys
native(10)                    :      1401834.32 +/- 1.44% op/s
hashtrie(10)                  :       474213.73 +/- 0.45% op/s
hamt(10)                      :      3368704.58 +/- 0.56% op/s
persistent-hash-trie(10)      :       163766.77 +/- 1.15% op/s
mori hash_map(10)             :       440950.98 +/- 8.78% op/s
immutable-map(10)             :      3466545.11 +/- 0.75% op/s
morearty Data.Map(10)         :       326113.89 +/- 0.60% op/s
native(100)                   :       232540.73 +/- 0.44% op/s
hashtrie(100)                 :        59156.36 +/- 1.08% op/s
hamt(100)                     :       384345.46 +/- 0.56% op/s
persistent-hash-trie(100)     :         8788.56 +/- 0.56% op/s
mori hash_map(100)            :        37687.89 +/- 0.49% op/s
immutable-map(100)            :       382298.47 +/- 1.13% op/s
morearty Data.Map(100)        :        40223.54 +/- 0.81% op/s
native(1000)                  :        25193.24 +/- 0.96% op/s
hashtrie(1000)                :         4509.49 +/- 0.44% op/s
hamt(1000)                    :        17762.37 +/- 1.18% op/s
persistent-hash-trie(1000)    :          872.68 +/- 1.11% op/s
mori hash_map(1000)           :         2916.23 +/- 0.97% op/s
immutable-map(1000)           :        36456.95 +/- 0.41% op/s
morearty Data.Map(1000)       :         3300.36 +/- 0.68% op/s
native(10000)                 :         2568.93 +/- 0.52% op/s
hashtrie(10000)               :          400.38 +/- 2.28% op/s
hamt(10000)                   :         3728.99 +/- 0.46% op/s
persistent-hash-trie(10000)   :          175.58 +/- 0.84% op/s
mori hash_map(10000)          :          250.91 +/- 0.50% op/s
immutable-map(10000)          :         4072.13 +/- 1.05% op/s
morearty Data.Map(10000)      :          313.67 +/- 0.59% op/s
```

[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable-map]: https://github.com/ActiveObject/immutable-map
[morearty]: https://github.com/Tvaroh/moreartyjs
