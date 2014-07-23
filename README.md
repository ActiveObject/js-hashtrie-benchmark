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
native(10)                    :     14444599.64 +/- 3.50% op/s
ht(10)                        :     10304515.46 +/- 2.95% op/s
hamt(10)                      :     10278643.41 +/- 3.19% op/s
persistent-hash-trie(10)      :      7416061.92 +/- 3.40% op/s
mori hash_map(10)             :      1597847.23 +/- 4.19% op/s
immutable-map(10)             :      8826683.74 +/- 3.07% op/s
morearty Data.Map(10)         :      7712084.73 +/- 3.29% op/s
native(100)                   :     15483016.71 +/- 3.22% op/s
ht(100)                       :      9164403.36 +/- 3.71% op/s
hamt(100)                     :      9147983.95 +/- 3.60% op/s
persistent-hash-trie(100)     :      3178772.96 +/- 3.67% op/s
mori hash_map(100)            :      1668086.36 +/- 3.63% op/s
immutable-map(100)            :      7217657.61 +/- 3.73% op/s
morearty Data.Map(100)        :      5645168.84 +/- 3.80% op/s
native(1000)                  :     18344343.66 +/- 3.35% op/s
ht(1000)                      :      7851852.79 +/- 3.76% op/s
hamt(1000)                    :      8006655.95 +/- 3.29% op/s
persistent-hash-trie(1000)    :      1783685.43 +/- 3.34% op/s
mori hash_map(1000)           :       845158.10 +/- 4.43% op/s
immutable-map(1000)           :      6378186.31 +/- 3.81% op/s
morearty Data.Map(1000)       :      5277747.93 +/- 3.81% op/s
native(10000)                 :     17515182.64 +/- 3.43% op/s
ht(10000)                     :      5694192.32 +/- 3.40% op/s
hamt(10000)                   :      6275027.45 +/- 3.40% op/s
persistent-hash-trie(10000)   :      1319588.84 +/- 3.88% op/s
mori hash_map(10000)          :       700744.95 +/- 5.11% op/s
immutable-map(10000)          :      4930714.64 +/- 3.88% op/s
morearty Data.Map(10000)      :      4103624.15 +/- 4.63% op/s
native(100000)                :      6332721.72 +/- 4.82% op/s
ht(100000)                    :      1719142.39 +/- 4.22% op/s
hamt(100000)                  :      1913944.79 +/- 4.08% op/s
persistent-hash-trie(100000)  :      1025202.66 +/- 3.78% op/s
mori hash_map(100000)         :       489152.80 +/- 6.26% op/s
immutable-map(100000)         :      1626174.89 +/- 3.86% op/s
morearty Data.Map(100000)     :      1542889.41 +/- 4.27% op/s


put nth
native(10)                    :      7614908.35 +/- 2.85% op/s
ht(10)                        :      4376284.55 +/- 3.75% op/s
hamt(10)                      :      4439778.51 +/- 3.13% op/s
persistent-hash-trie(10)      :       378023.86 +/- 2.93% op/s
mori hash_map(10)             :      1790566.28 +/- 3.63% op/s
immutable-map(10)             :      2179052.43 +/- 3.20% op/s
morearty Data.Map(10)         :      3816804.84 +/- 5.93% op/s
native(100)                   :      8906238.62 +/- 3.11% op/s
ht(100)                       :      2889803.71 +/- 3.36% op/s
hamt(100)                     :      2812271.31 +/- 3.23% op/s
persistent-hash-trie(100)     :       123115.87 +/- 2.90% op/s
mori hash_map(100)            :      1862470.04 +/- 3.14% op/s
immutable-map(100)            :      1382662.98 +/- 3.60% op/s
morearty Data.Map(100)        :      2631155.26 +/- 2.78% op/s
native(1000)                  :     12025883.46 +/- 3.64% op/s
ht(1000)                      :      2168566.47 +/- 3.31% op/s
hamt(1000)                    :      2034805.69 +/- 3.35% op/s
persistent-hash-trie(1000)    :        90461.17 +/- 3.02% op/s
mori hash_map(1000)           :      1897263.36 +/- 2.89% op/s
immutable-map(1000)           :      1083268.91 +/- 3.77% op/s
morearty Data.Map(1000)       :      1738259.73 +/- 3.34% op/s
native(10000)                 :     11170872.85 +/- 4.13% op/s
ht(10000)                     :      1619307.54 +/- 2.91% op/s
hamt(10000)                   :      1878294.78 +/- 6.57% op/s
persistent-hash-trie(10000)   :        86326.31 +/- 3.56% op/s
mori hash_map(10000)          :      1910213.28 +/- 3.56% op/s
immutable-map(10000)          :      1110980.17 +/- 3.07% op/s
morearty Data.Map(10000)      :      1753720.24 +/- 3.60% op/s
native(100000)                :     11804359.06 +/- 3.70% op/s
ht(100000)                    :      1437611.65 +/- 3.82% op/s
hamt(100000)                  :      1570503.73 +/- 3.91% op/s
persistent-hash-trie(100000)  :        36467.42 +/- 4.54% op/s
mori hash_map(100000)         :      1826740.59 +/- 4.00% op/s
immutable-map(100000)         :       849513.65 +/- 4.08% op/s
morearty Data.Map(100000)     :      1367268.46 +/- 3.17% op/s


Put All
native(10)                    :       492471.36 +/- 3.55% op/s
ht(10)                        :       311478.26 +/- 2.69% op/s
hamt(10)                      :       331788.52 +/- 3.53% op/s
persistent-hash-trie(10)      :        72546.75 +/- 3.89% op/s
mori hash_map(10)             :        88254.28 +/- 4.35% op/s
immutable-map(10)             :       217272.79 +/- 3.64% op/s
morearty Data.Map(10)         :       328913.54 +/- 2.76% op/s
native(100)                   :        54870.96 +/- 2.87% op/s
ht(100)                       :        22909.88 +/- 2.99% op/s
hamt(100)                     :        26272.84 +/- 3.18% op/s
persistent-hash-trie(100)     :         1717.74 +/- 2.69% op/s
mori hash_map(100)            :         9975.53 +/- 3.03% op/s
immutable-map(100)            :        16814.85 +/- 3.09% op/s
morearty Data.Map(100)        :        23250.40 +/- 2.95% op/s
native(1000)                  :         5027.66 +/- 3.82% op/s
ht(1000)                      :         1774.06 +/- 2.88% op/s
hamt(1000)                    :         1926.75 +/- 2.96% op/s
persistent-hash-trie(1000)    :          102.34 +/- 3.51% op/s
mori hash_map(1000)           :          450.81 +/- 3.32% op/s
immutable-map(1000)           :         1299.62 +/- 3.36% op/s
morearty Data.Map(1000)       :         1750.27 +/- 3.26% op/s
native(10000)                 :          497.10 +/- 5.02% op/s
ht(10000)                     :          126.90 +/- 4.06% op/s
hamt(10000)                   :          142.42 +/- 4.22% op/s
persistent-hash-trie(10000)   :            7.44 +/- 6.44% op/s
mori hash_map(10000)          :           49.17 +/- 3.55% op/s
immutable-map(10000)          :          100.18 +/- 4.65% op/s
morearty Data.Map(10000)      :          139.92 +/- 2.97% op/s
native(100000)                :           21.32 +/- 22.18% op/s
ht(100000)                    :            5.05 +/- 16.58% op/s
hamt(100000)                  :            5.87 +/- 20.11% op/s
persistent-hash-trie(100000)  :            0.34 +/- 2.56% op/s
mori hash_map(100000)         :            3.02 +/- 12.05% op/s
immutable-map(100000)         :            4.55 +/- 16.51% op/s
morearty Data.Map(100000)     :            5.83 +/- 17.57% op/s


remove nth
native(10)                    :     11085782.83 +/- 3.29% op/s
ht(10)                        :      2617734.67 +/- 5.63% op/s
hamt(10)                      :      3406146.18 +/- 2.74% op/s
persistent-hash-trie(10)      :       279174.43 +/- 3.36% op/s
mori hash_map(10)             :      1455816.93 +/- 3.32% op/s
immutable-map(10)             :      1671965.56 +/- 3.39% op/s
morearty Data.Map(10)         :      2586467.57 +/- 3.38% op/s
native(100)                   :     10345511.58 +/- 3.32% op/s
ht(100)                       :      1960573.88 +/- 4.78% op/s
hamt(100)                     :      2185718.89 +/- 3.95% op/s
persistent-hash-trie(100)     :        81304.02 +/- 2.63% op/s
mori hash_map(100)            :      1228253.57 +/- 3.49% op/s
immutable-map(100)            :      1531142.75 +/- 3.22% op/s
morearty Data.Map(100)        :      1750734.30 +/- 3.22% op/s
native(1000)                  :     10507391.82 +/- 3.22% op/s
ht(1000)                      :      1567615.81 +/- 2.93% op/s
hamt(1000)                    :      2039188.02 +/- 5.07% op/s
persistent-hash-trie(1000)    :        55985.12 +/- 3.02% op/s
mori hash_map(1000)           :       663392.99 +/- 3.16% op/s
immutable-map(1000)           :      1184029.58 +/- 3.51% op/s
morearty Data.Map(1000)       :      1587504.67 +/- 2.72% op/s
native(10000)                 :     10190826.62 +/- 3.11% op/s
ht(10000)                     :      1214312.54 +/- 3.89% op/s
hamt(10000)                   :      1454276.25 +/- 6.20% op/s
persistent-hash-trie(10000)   :        44389.60 +/- 3.52% op/s
mori hash_map(10000)          :       515754.55 +/- 3.64% op/s
immutable-map(10000)          :       915827.05 +/- 3.57% op/s
morearty Data.Map(10000)      :      1147404.12 +/- 3.62% op/s
native(100000)                :      8153242.82 +/- 8.41% op/s
ht(100000)                    :       644266.74 +/- 7.92% op/s
hamt(100000)                  :       810310.87 +/- 3.47% op/s
persistent-hash-trie(100000)  :        19819.05 +/- 3.98% op/s
mori hash_map(100000)         :       328350.21 +/- 4.11% op/s
immutable-map(100000)         :       666038.79 +/- 3.28% op/s
morearty Data.Map(100000)     :       660901.69 +/- 3.66% op/s


Remove All
native(10)                    :      1347042.70 +/- 3.62% op/s
ht(10)                        :       323396.32 +/- 6.01% op/s
hamt(10)                      :       423105.57 +/- 5.46% op/s
persistent-hash-trie(10)      :        39971.89 +/- 3.41% op/s
mori hash_map(10)             :       152436.46 +/- 3.95% op/s
immutable-map(10)             :       170275.86 +/- 3.45% op/s
morearty Data.Map(10)         :       276878.75 +/- 3.33% op/s
native(100)                   :       133016.43 +/- 3.17% op/s
ht(100)                       :        23978.59 +/- 2.64% op/s
hamt(100)                     :        30186.89 +/- 3.41% op/s
persistent-hash-trie(100)     :         3178.07 +/- 2.98% op/s
mori hash_map(100)            :        11654.98 +/- 2.97% op/s
immutable-map(100)            :        15426.90 +/- 3.04% op/s
morearty Data.Map(100)        :        19037.86 +/- 3.31% op/s
native(1000)                  :        13113.91 +/- 3.61% op/s
ht(1000)                      :         1798.70 +/- 3.57% op/s
hamt(1000)                    :         2230.47 +/- 2.90% op/s
persistent-hash-trie(1000)    :         1470.84 +/- 5.36% op/s
mori hash_map(1000)           :          632.69 +/- 2.77% op/s
immutable-map(1000)           :         1205.10 +/- 2.86% op/s
morearty Data.Map(1000)       :         1754.22 +/- 3.10% op/s
native(10000)                 :         1339.37 +/- 3.00% op/s
ht(10000)                     :          122.44 +/- 3.94% op/s
hamt(10000)                   :          149.91 +/- 5.60% op/s
persistent-hash-trie(10000)   :          428.48 +/- 3.66% op/s
mori hash_map(10000)          :           55.76 +/- 3.93% op/s
immutable-map(10000)          :           92.47 +/- 3.60% op/s
morearty Data.Map(10000)      :          123.42 +/- 4.16% op/s
native(100000)                :          109.73 +/- 5.62% op/s
ht(100000)                    :            5.58 +/- 12.62% op/s
hamt(100000)                  :            7.62 +/- 8.36% op/s
persistent-hash-trie(100000)  :           37.78 +/- 4.32% op/s
mori hash_map(100000)         :            2.75 +/- 19.43% op/s
immutable-map(100000)         :            6.75 +/- 4.67% op/s
morearty Data.Map(100000)     :            6.95 +/- 4.34% op/s


Count
native(10)                    :      7006756.42 +/- 3.46% op/s
ht(10)                        :       624864.59 +/- 3.27% op/s
hamt(10)                      :     10377659.94 +/- 2.62% op/s
persistent-hash-trie(10)      :       340169.37 +/- 3.55% op/s
mori hash_map(10)             :     48634423.15 +/- 4.07% op/s
immutable-map(10)             :     75523230.10 +/- 4.83% op/s
morearty Data.Map(10)         :      4687980.20 +/- 4.01% op/s
native(100)                   :      6733521.24 +/- 3.04% op/s
ht(100)                       :        57707.59 +/- 2.86% op/s
hamt(100)                     :       737359.29 +/- 3.00% op/s
persistent-hash-trie(100)     :        10704.68 +/- 3.52% op/s
mori hash_map(100)            :     49508520.45 +/- 3.27% op/s
immutable-map(100)            :     76704975.63 +/- 2.74% op/s
morearty Data.Map(100)        :       419152.47 +/- 3.04% op/s
native(1000)                  :      6672607.79 +/- 3.45% op/s
ht(1000)                      :         5917.10 +/- 3.50% op/s
hamt(1000)                    :        31902.66 +/- 3.50% op/s
persistent-hash-trie(1000)    :         1043.08 +/- 3.90% op/s
mori hash_map(1000)           :     51633505.80 +/- 3.19% op/s
immutable-map(1000)           :     80457406.15 +/- 3.69% op/s
morearty Data.Map(1000)       :        38267.09 +/- 3.18% op/s
native(10000)                 :      6855522.04 +/- 3.45% op/s
ht(10000)                     :          549.23 +/- 3.73% op/s
hamt(10000)                   :         7384.07 +/- 3.10% op/s
persistent-hash-trie(10000)   :          233.50 +/- 4.35% op/s
mori hash_map(10000)          :     49839805.61 +/- 3.04% op/s
immutable-map(10000)          :     81272424.69 +/- 3.34% op/s
morearty Data.Map(10000)      :         4446.98 +/- 3.16% op/s
native(100000)                :      6619451.82 +/- 3.05% op/s
ht(100000)                    :           32.82 +/- 3.65% op/s
hamt(100000)                  :          120.97 +/- 4.83% op/s
persistent-hash-trie(100000)  :           30.01 +/- 3.24% op/s
mori hash_map(100000)         :     50681506.86 +/- 3.99% op/s
immutable-map(100000)         :     81307032.73 +/- 3.39% op/s
morearty Data.Map(100000)     :          103.28 +/- 4.10% op/s


Sum
native-for-loop(10)           :      3724589.37 +/- 3.11% op/s
native-for-in-loop(10)        :      6579715.65 +/- 3.24% op/s
ht(10)                        :       608092.62 +/- 3.00% op/s
hamt(10)                      :      7534085.94 +/- 3.29% op/s
persistent-hash-trie(10)      :       328764.79 +/- 3.02% op/s
mori hash_map(10)             :            0.01 +/- 196.00% op/s
immutable-map(10)             :      9125686.32 +/- 3.08% op/s
morearty Data.Map(10)         :      3221447.58 +/- 4.11% op/s
native-for-loop(100)          :      3546491.26 +/- 3.22% op/s
native-for-in-loop(100)       :      6557215.70 +/- 3.41% op/s
ht(100)                       :        56033.30 +/- 3.51% op/s
hamt(100)                     :       549185.56 +/- 2.78% op/s
persistent-hash-trie(100)     :         9892.63 +/- 4.02% op/s
mori hash_map(100)            :       235750.00 +/- 2.92% op/s
immutable-map(100)            :       893469.24 +/- 3.60% op/s
morearty Data.Map(100)        :       325639.61 +/- 3.79% op/s
native-for-loop(1000)         :      3667244.79 +/- 2.72% op/s
native-for-in-loop(1000)      :      6478359.47 +/- 3.03% op/s
ht(1000)                      :         5850.57 +/- 3.29% op/s
hamt(1000)                    :        26628.68 +/- 3.59% op/s
persistent-hash-trie(1000)    :         1030.98 +/- 3.24% op/s
mori hash_map(1000)           :        17655.85 +/- 2.69% op/s
immutable-map(1000)           :        69435.14 +/- 3.18% op/s
morearty Data.Map(1000)       :        30704.38 +/- 3.53% op/s
native-for-loop(10000)        :      3712047.79 +/- 2.90% op/s
native-for-in-loop(10000)     :      6414620.06 +/- 3.12% op/s
ht(10000)                     :          538.23 +/- 3.60% op/s
hamt(10000)                   :         5256.26 +/- 3.27% op/s
persistent-hash-trie(10000)   :          203.62 +/- 4.77% op/s
mori hash_map(10000)          :         2468.42 +/- 3.58% op/s
immutable-map(10000)          :         7192.12 +/- 3.67% op/s
morearty Data.Map(10000)      :         3415.87 +/- 3.60% op/s
native-for-loop(100000)       :      3490738.80 +/- 3.70% op/s
native-for-in-loop(100000)    :      6465158.35 +/- 2.96% op/s
ht(100000)                    :           31.83 +/- 3.90% op/s
hamt(100000)                  :          109.67 +/- 4.16% op/s
persistent-hash-trie(100000)  :           26.52 +/- 5.18% op/s
mori hash_map(100000)         :           65.21 +/- 4.22% op/s
immutable-map(100000)         :          111.98 +/- 4.07% op/s
morearty Data.Map(100000)     :           89.17 +/- 3.87% op/s


Keys
native(10)                    :      7010288.94 +/- 2.98% op/s
ht(10)                        :       574143.97 +/- 3.29% op/s
hamt(10)                      :      4225974.76 +/- 3.36% op/s
persistent-hash-trie(10)      :       333930.00 +/- 3.48% op/s
mori hash_map(10)             :       414655.15 +/- 3.03% op/s
immutable-map(10)             :      3892116.88 +/- 3.70% op/s
morearty Data.Map(10)         :      3232622.60 +/- 4.06% op/s
native(100)                   :      7024720.40 +/- 2.88% op/s
ht(100)                       :        52784.84 +/- 3.38% op/s
hamt(100)                     :       453350.28 +/- 2.94% op/s
persistent-hash-trie(100)     :        10538.36 +/- 3.41% op/s
mori hash_map(100)            :        38974.93 +/- 2.96% op/s
immutable-map(100)            :       440996.39 +/- 2.80% op/s
morearty Data.Map(100)        :       361338.97 +/- 4.24% op/s
native(1000)                  :      6997880.26 +/- 3.09% op/s
ht(1000)                      :         5554.47 +/- 2.75% op/s
hamt(1000)                    :        23089.25 +/- 2.66% op/s
persistent-hash-trie(1000)    :         1077.99 +/- 3.15% op/s
mori hash_map(1000)           :         3186.92 +/- 2.89% op/s
immutable-map(1000)           :        39327.83 +/- 3.62% op/s
morearty Data.Map(1000)       :        36244.96 +/- 3.29% op/s
native(10000)                 :      6663960.11 +/- 4.03% op/s
ht(10000)                     :          484.52 +/- 4.40% op/s
hamt(10000)                   :         4004.35 +/- 3.44% op/s
persistent-hash-trie(10000)   :          207.15 +/- 5.11% op/s
mori hash_map(10000)          :          237.05 +/- 5.97% op/s
immutable-map(10000)          :         4530.55 +/- 3.68% op/s
morearty Data.Map(10000)      :         3984.15 +/- 3.55% op/s
native(100000)                :      6977602.59 +/- 3.39% op/s
ht(100000)                    :           28.77 +/- 9.85% op/s
hamt(100000)                  :           96.20 +/- 4.20% op/s
persistent-hash-trie(100000)  :           28.98 +/- 3.57% op/s
mori hash_map(100000)         :           17.79 +/- 9.46% op/s
immutable-map(100000)         :           78.66 +/- 4.07% op/s
morearty Data.Map(100000)     :           83.50 +/- 10.12% op/s
```

[hashtrie]: https://github.com/mattbierner/hashtrie
[hamt]: https://github.com/mattbierner/hamt
[mori]: https://github.com/swannodette/mori
[persistent]: https://github.com/hughfdjackson/persistent-hash-trie
[immutable-map]: https://github.com/ActiveObject/immutable-map
[morearty]: https://github.com/Tvaroh/moreartyjs
