const plusButton = document.querySelector(".image-container");
const bucketsContainer = document.querySelector(".flex-row");
const input = document.querySelector("#myInput");


document.addEventListener('DOMContentLoaded', function async () {



    plusButton.addEventListener('click', function () {
        const text = input.value;
        const newBucket = document.createElement('div');
        newBucket.className = 'bucket center';
        newBucket.innerText = text;

        bucketsContainer.appendChild(newBucket);

        saveBuckets();

        displayBuckets();
    });

    function saveBuckets() {
        const buckets = document.querySelectorAll('.bucket');

        const bucketsArray = Array.from(buckets).map(bucket => bucket.innerText);
        localStorage.setItem('buckets', JSON.stringify(bucketsArray));
    }

    bucketsContainer.addEventListener('click', function (event) {
        if (event.target.classList.contains('deleteButton')) {
            const bucket = event.target.closest('.bucket');
            bucket.parentNode.removeChild(bucket);

            saveBuckets();

            displayBuckets();
        }
    });

    function displayBuckets() {
        bucketsContainer.innerHTML = '';

        const storedBuckets = JSON.parse(localStorage.getItem('buckets')) || [];

        for (let i = 0; i < storedBuckets.length; i += 6) {
            const rowBuckets = storedBuckets.slice(i, i + 6);

            const row = document.createElement('div');
            row.className = 'flex-row';

            rowBuckets.forEach((bucketText, index) => {
                const bucket = document.createElement('div');
                const bucketNum = i / 6 + index + 1;
                bucket.className = `bucket img${bucketNum} center`;
                bucket.innerText = bucketText;

                const deleteButton = document.createElement('img');
                deleteButton.src = './resources/Delete.png';
                deleteButton.className = 'deleteButton';
                bucket.appendChild(deleteButton);

                row.appendChild(bucket);
            });

            bucketsContainer.appendChild(row);
        }
    }

     displayBuckets();

    const buckets = document.querySelectorAll(".bucket");
    buckets.forEach((bucket, index) => {
        // 로컬 스토리지에서 상태 읽기
        const isDone = localStorage.getItem("bucket" + index) === "done";
        if (isDone) {
            bucket.classList.add("done");
        }
    });
});

buckets.forEach((bucket, index) => {
    bucket.addEventListener("click", function () {
        // 클래스 토글
        bucket.classList.toggle("done");

        // 로컬 스토리지에 상태 저장
        if (bucket.classList.contains("done")) {
            localStorage.setItem("bucket" + index, "done");
        } else {
            localStorage.setItem("bucket" + index, "");
        }
    });
}
);
