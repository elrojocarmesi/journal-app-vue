<template>
    <template v-if="entry">
        <div class="entry-title d-flex jsutify-content-between p-2">
            <div>
                <span class="text-success fs-3 fw-bold">{{ day }}</span>
                <span class="mx-1 fs-3">{{ month }}</span>
                <span class="mx-2 fs-4 fw-light">{{ year }}</span>
            </div>
            <div>
                <input type="file" @change="onSelectedImage" ref="imageSelector" hidden v-show="false"
                    accept="image/png, image/jpeg">
                <button class="btn btn-danger mx-2" v-if="entry.id" @click="onDeleteEntry">
                    Borrar
                    <i class="fa fa-trash-alt"></i>
                </button>
                <button class="btn btn-primary" @click="onSelectImage">
                    Subir foto
                    <i class="fa fa-upload"></i>
                </button>
            </div>
        </div>
        <hr>
        <div class="d-flex flex-column px-3 h-75">
            <textarea placeholder="¿Qué sucedio hoy?" v-model="entry.text"></textarea>
        </div>
        <img v-if="entry.picture && !localImage" :src="entry.picture" alt="img-entry" class="img-thumbnail">
        <img v-if="localImage" :src="localImage" alt="img-entry" class="img-thumbnail">
        <Fab icon="fa-save" @on:click="saveEntry" />

    </template>
</template>
<script>
import { defineAsyncComponent } from 'vue'
import { mapGetters, mapActions } from 'vuex'
import swal from 'sweetalert2'
import getDayMonthYear from '../helpers/dayMonthYear'
import uploadImage from '../helpers/uploadImage'

export default {
    props: {
        id: {
            typeof: String,
            required: true
        }
    }, data() {
        return {
            entry: null,
            localImage: null,
            file: null
        }
    },

    computed: {
        ...mapGetters('journal', ['getEntriesById']),
        day() {
            const { day } = getDayMonthYear(this.entry.date)
            return day
        },
        month() {
            const { month } = getDayMonthYear(this.entry.date)
            return month
        },
        year() {
            const { fullYear } = getDayMonthYear(this.entry.date)
            return fullYear
        }
    },
    methods: {
        ...mapActions('journal', ['updateEntry', 'createEntry', 'deleteEntry']),
        loadEntry() {
            let entry
            if (this.id === 'new') {
                entry = {
                    text: '',
                    date: new Date().getTime()
                }
            } else {
                entry = this.getEntriesById(this.id)
                if (!entry) return this.$router.push({ name: 'no-entry' })
            }
            this.entry = entry

        },
        async saveEntry() {

            new swal({
                title: 'Espere por favor...',
                allowOutsideClick: false
            })

            swal.showLoading()
            const picture = await uploadImage(this.file)

            this.entry.picture = picture

            if (this.entry.id) {
                await this.updateEntry(this.entry)
            } else {
                const id = await this.createEntry(this.entry)
                this.$router.push({ name: 'entry', params: { id } })
            }
            this.file = null

            swal.fire({
                icon: 'success',
                title: 'Guardado',
                width: 500,
                padding: '3em',
                text: 'Entrada registrada con éxito',
                showConfirmButton: false,
                timer: 2000
            })
        },
        async onDeleteEntry() {
            //console.log('delete', this.entry);
            const { isConfirmed } = await swal.fire({
                title: 'Quieres eliminar?',
                text: 'una vez borrado, no se podra recuperar',
                showDenyButton: true,
                confirmButtonText: 'Sí, aceptar',
                denyButtonText: `No, cancelar`,
            })
            if (isConfirmed) {

                new swal({
                    title: 'Espere por favor...',
                    allowOutsideClick: false
                })

                swal.showLoading()
                await this.deleteEntry(this.entry.id)
                this.$router.push({ name: 'no-entry' })
                swal.fire({
                    icon: 'success',
                    title: 'Eliminado',
                    width: 500,
                    padding: '3em',
                    showConfirmButton: false,
                    timer: 2000
                })

            }


        },
        onSelectedImage(event) {
            const file = event.target.files[0]
            if (!file) {
                this.localImage = null
                this.file = null
                return
            }

            this.file = file
            const fr = new FileReader()
            fr.onload = () => this.localImage = fr.result
            fr.readAsDataURL(file)
        },
        onSelectImage() {
            this.$refs.imageSelector.click()
        }
    },
    components: {
        Fab: defineAsyncComponent(() => import('../components/Fab.vue'))
    },
    created() {
        this.loadEntry()
    },
    watch: {
        id() {
            this.loadEntry()
        }
    }
}
</script>
<style lang="scss" scoped>
textarea {
    font-size: 20px;
    border: none;
    height: 100%;

    &:focus {
        outline: none;
    }
}

img {
    width: 200px;
    right: 20px;
    bottom: 150px;
    position: fixed;
    box-shadow: 0px 5px 10px rgba($color: #000000, $alpha: 0.2);

}
</style>