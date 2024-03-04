<script>
	let { firstName, lastName, status, institute, email } = $props();
</script>

<div class="mb-6 w-full rounded-lg bg-white p-4 shadow-md">
	<div class="user-card w-full">
		<div class="orange flex flex-row items-center justify-center font-bold text-blue-800">
			{firstName}
			{lastName}
		</div>
		<div class="mt-4 grid grid-cols-12 gap-6 px-6">
			<div class="col-span-4">
				<div class="flex flex-col items-center justify-center">
					<h3 class="font-bold text-orange-500">Status</h3>
					<p>{status}</p>
				</div>
			</div>

			<div class="col-span-4">
				<div class="flex flex-col items-center justify-center">
					<h3 class="font-bold text-orange-500">Institut</h3>
					<p>{institute}</p>
				</div>
			</div>

			<div class="col-span-4">
				<div class="flex flex-col items-center justify-center">
					<h3 class="font-bold text-orange-500">E-Mail</h3>
					<p>{email}</p>
				</div>
			</div>
		</div>
	</div>
</div>
